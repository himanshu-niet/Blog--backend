const router=require("express").Router()
const {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getMyBlogs,
} = require("../controller/blogController");
const authenticateToken = require("../middleware/token");

router.get("/",getBlogs)

router.get("/get", getBlog);

router.get("/my",authenticateToken, getMyBlogs);

router.post("/", authenticateToken,addBlog);

router.put("/", authenticateToken,updateBlog);

router.delete("/", authenticateToken,deleteBlog);


module.exports=router