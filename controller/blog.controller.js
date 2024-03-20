const Blogs = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalBlogs, allBlogs] = await Promise.all([
      Blogs.countDocuments(),
      Blogs.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalBlogs / perPage);
    if (allBlogs.length === 0) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allBlogs,
      page,
      totalPages,
      totalItems: totalBlogs,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (req.method === "GET") {
      blog.views += 1;
      await blog.save();
    }
    return res.json({ data: blog });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    req.body.image = req.images;
    const newBlog = await Blogs.create(req.body);
    return res.json({ data: newBlog });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    if (req.image && req.images.length <= 0) {
      return res.status(400).json({ message: "Invalid image length" });
    }
    const oldBlog = await Blogs.findById(req.params.blogId);
    if (!oldBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    req.body.image = req.images;
    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      { new: true }
    );
    return res.json({ data: updatedBlog });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blogs.findByIdAndDelete(req.params.blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
