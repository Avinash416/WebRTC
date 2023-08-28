import user from "../Model/registerModel.js";
import crypto from "crypto";
import bcrypt from   "bcrypt"

const register =async (req,res)=>{
    try {
        const {email,password}=await req.body;
        if(!email,!password){
            return res.status(422).json("Plese fill the fields")
        }
        let exist = await user.findOne({email:email})
        // console.log(exist)
        if(exist){
            return res.status(409).json('Email Already Exist')
        }
        else{
         let newUser =new user({
            email,
            password,
            emailtoken: crypto.randomBytes(64).toString("hex"),
            isverified : false
        });
        let salt=await bcrypt.genSalt(12);
        let hashpassword=await bcrypt.hash(newUser.password,salt)
        newUser.password=hashpassword
         await  newUser.save();
         return res.status(200).json("user registered")
        }
    } catch (error) {
        console.log("Error:",error.massage)
    }
}
export default register