import jwt from 'jsonwebtoken';


interface UserPayload {
    _id: string;
    name: string;
    email: string;
}

const genAuthToken = (user: UserPayload): string =>{
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign({
        _id: user._id.toString(),
        name:user.name,
        email:user.email,
    },
    secretKey
    );

    return token;
}

export default genAuthToken;