import bcrypt from 'bcrypt';
import Joi from 'joi';
import { Request, Response } from 'express';
import User from '../models/users';
import genAuthToken from '../utils/genAuthToken';

const express = require('express');
const router = express.Router();

interface LoginRequestBody {
    email: string;
    password: string;
  }
router.post('/', async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<any> =>{
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).send(error.details[0].message);  // Sending Response here
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
    return res.status(400).send('Invalid email or password'); // Sending Response here
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if(!isValid){
        return res.status(404).send("Invalid Password");
    }
    else{
        const token = genAuthToken(user)
        res.send(token);
    }

})

export default router;
