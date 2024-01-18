import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/model.js";
import dotenv from "dotenv"
dotenv.config()

const url="https://jsonplaceholder.typicode.com/users";

const data= async(url)=>{

    var response=await fetch(url);

    response=await response.json();

    return response;
}

export const Login= async (request,response)=>{
    try{
        console.log("login is being called")
        const {email,password}=request.body;
        console.log(email,password)
        console.log(email,password)
        let user= await User.findOne({email:email})
        
        if(!user){
            return response.status(400).json({msg:"No User With This Email.Plase Signup"})
        }
        
        let match=await bcrypt.compare(password,user.password)
        
        if(match){

            const Token=jwt.sign(user.toJSON(),process.env.JWT_KEY,{expiresIn:"1h"})
            return response.status(200).json({message:"Authentication Successfull ",Token:Token})

        }else{
            response.status(400).json({msg:"Password Does Not Match"})
        }
    }catch(error){
        return response.status(500).json({msg:error.message})
    }
}

export const Signup= async (request,response)=>{
    try{
        console.log("signup is being called")
        const {name,email,password}=request.body;

        let user_exist = await User.findOne({ email: email });

        if (user_exist) {
            return response.status(409).json({ msg: "User with this email already exists" })
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user={
            name:name,
            email:email,
            password:hashedPassword,
        }

        const newUser=User(user);
        await newUser.save();

        return response.status(200).json({message:"User Signed up Successfully"})



    }catch(error){
        response.status(500).json({message:"Internal Server Error"})
    }
}

export const Upsorted= async (request,response)=>{

    const res=await data(url);
    res.sort((a,b)=>a.name.localeCompare(b.name));
    return response.status(200).json(res)
}

export const Downsorted= async (request,response)=>{

    const res=await data(url);
    res.sort((a, b) => b.name.localeCompare(a.name));
    return response.status(200).json(res);
}

export const UserData= async (request,response)=>{

    const res= await data(url);
    return response.status(200).json(res)
}