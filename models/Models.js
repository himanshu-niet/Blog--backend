const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phone: String,
  h_password: String,
});

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: String,
  createdOn: String,
});


const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = {User,Blog}
