const express=require("express")
const Connection = require("./config/db")
const UserRouter = require("./Routes/User")
const PostRouter = require("./Routes/StockPost")
const CommentRouter = require("./Routes/Comments")
const LikeRouter = require("./Routes/Like")
const app=express()
require("dotenv").config()
app.use(express.json())
// User Routes for login or register
app.use("/api/auth",UserRouter)
// for get by Id
app.use("/api/user",UserRouter)
// stock endpoint
app.use("/api",PostRouter)
// comment endpoint
app.use("/api",CommentRouter)
// like Router
app.use("/api",LikeRouter)
app.listen(process.env.PORT,()=>{
    Connection()
    console.log(`server is running${process.env.PORT}`)
})