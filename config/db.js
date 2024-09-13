const mongoose=require("mongoose")
async function Connection(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log(`DB NOT CONNECTED${error}`)
    }
}
module.exports=Connection