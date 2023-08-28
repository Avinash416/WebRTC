import user from "../Model/registerModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"


const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


export const login =async(req,res)=>{
    try {
        const {email,password}=await req.body;
        if(!email,!password){
                return res.status(422).json("plese fill the fields")
        }
        let userExist =await user.findOne({email:email});
        if(userExist){
            const token=createToken(userExist.id)
            res.cookie('access-token',token)
             const match=await bcrypt.compare(password,userExist.password)
            console.log(match)
         if(match){
            return res.status(201).json('User Found')
        }
        }else{
            res.status(404).json("Not Found")       
         }

    } catch (error) {
        console.log("Error:",error.massage)
    }



}