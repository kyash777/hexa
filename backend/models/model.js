import mongoose from "mongoose"

const userSchema={
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
}

const User=mongoose.model("user",userSchema);

export default User;