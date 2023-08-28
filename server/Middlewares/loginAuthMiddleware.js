import jwt from "jsonwebtoken"
import cookie from "cookie-parser"
export const loginAuth =async(req,res,next)=>{
    const token =await req.cookies['access-token'];
    console.log(token)
    console.log("in auth",token)
    if(token){
        const validateToken=jwt.verify(token,process.env.JWT_SECRET)
        if(validateToken){
            res.user=validateToken.id
            next()
        }else{
            return res.status(401).json("token expired")
        }
    }else{
        return res.status(404).json("token not found")
    }
}
