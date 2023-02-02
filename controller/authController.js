const { StatusCodes } = require("http-status-codes");
const {User} =require("../models/Models")
const JWT =require("jsonwebtoken")
const bcrypt = require("bcrypt");


const signup=async (req,res)=>{
  

   try {
 const { name, email, phone, password } = req.body;

 if ((!name, !email, !phone, !password)) {
   return res
     .status(StatusCodes.BAD_REQUEST)
     .json({ data: "Enter Full Details" });
 }
   const user1 = await User.findOne({ email });
   if (user1) {
     return res.status(StatusCodes.NOT_ACCEPTABLE).json({
       data: "Email already Used",
     });
   }
 const h_password = await bcrypt.hash(password, 10);
 
  
    const userModel = new User({name,email,phone,h_password});
    await userModel.save();
    return res.status(StatusCodes.CREATED).json({data:"User Registerd"})
    
   } catch (error) {
    
    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .json({ data: "Registration Failed \n"+error.message });
   }

}

const signin = async(req, res) => {
 try {
    var {email, password } = req.body;

    if (!email, !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ data: "Request Body Error" });
    }

    const user = await User.findOne({ email });
 
    if (user) {
      const { _id,name, email,phone,h_password } = user;

      const isOk= bcrypt.compare(password,h_password);
      
  
      if (isOk) {


   const token = JWT.sign({ _id:_id, email:email }, process.env.JWT_SECRET, {
     expiresIn: "10d",
   });    
       return res.status(StatusCodes.ACCEPTED).json({
         data: {
           token,
           user: { _id, name, email, phone },
         }
       });

      } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        data: "Password wrong!",
      });
      }
    } else {
     return res.status(StatusCodes.BAD_REQUEST).json({
       data: "User does not exist..!",
     });
    }

  } catch (error) {
   return res
     .status(StatusCodes.SERVICE_UNAVAILABLE)
     .json({ message: "Technical Error" });
  }
};


module.exports={
    signup,
    signin
}