import mongoose from "mongoose";

const userShema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    emailtoken:{
        type : String,
    },
    isVerified:{
        type:Boolean,
    },
    date:{
        type:Date,
        default: Date.now()
    }
})

const user =mongoose.model('user',userShema)
export default user