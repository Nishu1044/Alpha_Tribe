const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    bio:{type:String},
    profilePicture:{type:String},
    createdAt:{type:Date,default:Date.now}
})
const user=mongoose.model("user",UserSchema)
module.exports=user