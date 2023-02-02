const express =require("express")
require("dotenv").config();
const app = express()
const blogRouter=require("./router/blogRouter")
const {signin,signup} =require("./controller/authController")
const connectDB=require("./DB/connect")

connectDB(process.env.MONGO_URL);

app.use(express.json())


app.post("/api/signup",signup)
app.post("/api/signin", signin);

app.use("/api/blog",blogRouter)

app.listen(process.env.PORT,()=>console.log("server running"))

module.exports=app