import mongoose from "mongoose";


const Connection =async(URL)=>{
    try {
       await mongoose.connect(URL,{
            useUnifiedTopology: true,
            useNewUrlParser :true,
            
        })
        console.log("Database Connected")
    } catch (error) {
        console.log("Error",error.massage)
    }
}

export default Connection