import bcrypt from "bcrypt";
import Joi from "joi";
import { Request, Response } from "express";
import User from "../models/users";
import genAuthToken from '../utils/genAuthToken'
const express = require("express");
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({email:req.body.email});

    if(user){
        return res.status(400).send("User Already Exists...");

    }
    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    user = await user.save();
    const token = genAuthToken(user);
    res.status(201).send({ token, message: "User registered successfully!" });

})

export default router;