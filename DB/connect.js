const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
    
    })
    .catch((err) => {
      console.error("Database connection error");
    });
};
module.exports = connectDB;
