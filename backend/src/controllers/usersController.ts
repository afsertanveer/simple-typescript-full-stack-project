import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
interface SignUpBody{
    username:string,
    email:string,
    password:string,
}

export const signUp:RequestHandler<unknown,unknown,SignUpBody,unknown> = async(req,res,next)=>{
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400,"parameter missing");
        }
        const existingUsername = await UserModel.findOne({username:username}).exec();
        if(existingUsername){
            throw createHttpError(409,"Username Already Taken. Please choose a different one or log in instead");
            
        }
        const existingEmail = await UserModel.findOne({email:email}).exec();
        if(existingEmail){
            throw createHttpError(409,"Email address already exists. Please log in instead");          
        }

        const passwordHashed =  await bcrypt.hash(passwordRaw,10)
        const newUser = await UserModel.create({
            username:username,
            email:email,
            password:passwordHashed
        })
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}