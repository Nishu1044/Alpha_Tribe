const user = require("../model/User")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
// USer Registaration
const Registration=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const Ispresent=await user.findOne({email})
        if(Ispresent){
            return res.json({message:"User already present"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
                const newUser=await new user({
                    username,
                    email,
                    password:hash
                })
                await newUser.save()
        res.json({ success: true, message: 'User registered successfully', newUser }
        )
        })
       

    } catch (error) {
        res.json({message:error.message})
    }
} 
// USer LOgin
const Login=async(req,res)=>{
    const {email,password}=req.body
    try {
     const User=await user.findOne({email})
     bcrypt.compare(password,User.password,async(err,result)=>{
        if(err){
            return res.json({message:"Crediatial not match",err})
        }
        if(result){
            let token=jwt.sign({id:User._id},process.env.SECRETKEY,{expiresIn:'5h'})
            res.json({message:"Token Generated",token})
        }
     })   
    } catch (error) {
        res.json({message:error.message})
    }
}




// Get User Profile
const getUserProfile = async (req, res) => {
    console.log("userrequest", req.user)
    try {
        const id = req.params.userId 

        const User = await user.findById(id);
        console.log("user data", User)

        // Check if the user exists
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

      
        res.status(200).json({
            id: User._id,
            username: User.username,
            bio: User.bio,
            profilePicture: User.profilePicture,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 //Update User Profile 
const updateUserProfile = async (req, res) => {
    console.log("userrequest", req.user)
    
    try {
        const User=await user.findByIdAndUpdate(req.user.id,req.body)
        if (!User) return res.status(404).json({ message: 'User not found' });
        res.json({ success: true, message: 'Profile updated'})
        console.log("user data", User)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




    
    
module.exports={Registration,Login,getUserProfile,updateUserProfile}