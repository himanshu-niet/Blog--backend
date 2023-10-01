const express =require("express")
const app = express()
const blogRouter=require("./router/blogRouter")
const {signin,signup} =require("./controller/authController")
const connectDB=require("./DB/connect")

connectDB("mongodb+srv://himanshu16:himanshu@cluster0.vfz23.mongodb.net/blog?retryWrites=true&w=majority");

app.use(express.json())


app.post("/api/signup",signup)
app.post("/api/signin", signin);

app.use("/api/blog",blogRouter)

app.listen(3001,()=>console.log("server running"))

module.exports=app