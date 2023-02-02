const {Blog} =require("../models/Models") 
const { StatusCodes } = require("http-status-codes");


const getBlogs=async(req,res)=>{
  try {
     const blogs = await Blog.find();
     
     if (blogs.length===0) {
       return res.status(StatusCodes.OK).json({ data:"NO DATA" });
     }
       return res.status(StatusCodes.OK).json({ data: blogs });

  } catch (error) {
       return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ data: error.message });
    
  }


}


const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id;

    const blog = await Blog.find({ createdBy: userId });
    if (!blog) {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: "Not Found",
      });
    }
    return res.status(StatusCodes.OK).json({
      data: blog,
    });
  } catch (error) {
    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .json({ data: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blogId = req.query.id;


    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: "Not Found",
      });
    }

    return res.status(StatusCodes.OK).json({
      data: blog,
    });
  } catch (error) {
    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .json({ data: error.message });
  }
};

const addBlog = async(req, res) => {
  try {

    const {title,description }=req.body;
    const {_id}=req.user

    if ((!title, !description)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Enter Full Details" });
    }
  
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var date = day + "-" + month + "-" + year;

     const blogs = new Blog({
       title,
       description,
       createdBy: _id,
       createdOn: date,
     });
      await blogs.save();
      return res.status(StatusCodes.CREATED).json({ data: "Blog Added Successfully" });
     

  } catch (error) {
       return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ data: error.message });
    
  }

};



const updateBlog =async (req, res) => {
  try {
    const blogId = req.query.id;
    const userId = req.user._id;

 if (!req.body.title && !req.body.description) {
   return res.status(StatusCodes.BAD_REQUEST).json({ message: "Enter Data" });
 }

const blog = await Blog.findOne({ _id: blogId, createdBy: userId });
   if (!blog) {
     return res.status(StatusCodes.NOT_FOUND).json({
       data: "Not Found",
     });
   }

   const title= req.body.title || blog.title
   const description = req.body.description || blog.description;

   let newData={
    title:title,
    description:description
   }
await blog.updateOne(newData)

return res.status(StatusCodes.OK).json({
  data: "Blog Update Successfully",
});

  } catch (error) {
    return res
      .status(StatusCodes.SERVICE_UNAVAILABLE)
      .json({ data: error.message });
  }
};


const deleteBlog = async(req, res) => {
try {
  const blogId=req.query.id
  const userId=req.user._id

  const blog = await Blog.findOne({ _id: blogId, createdBy: userId });
   if (!blog) {
     return res.status(StatusCodes.NOT_FOUND).json({
       data: "Not Found",
     });
   }
   await blog.delete()

 return res.status(StatusCodes.OK).json({
   data: "Blog Deleted Successfully",
 });

} catch (error) {
       return res
         .status(StatusCodes.SERVICE_UNAVAILABLE)
         .json({ data: error.message });
}
};


module.exports = {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getMyBlogs,
};