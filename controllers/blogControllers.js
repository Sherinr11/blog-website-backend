
const BlogModel = require('../models/blogModel');

const readBlogs = async (req, res) => {
    try {
        let result =  await BlogModel.find({}, { secretKey: 0 });
        res.status(200).json({ data: result, msg: "", err: "" });
    } catch (err) {
        console.error("Error reading blogs:", err.message);
        res.status(500).json({ data: "", msg: "Unable to read data", err: err.message });
    }
};

const searchBlogs = async (req, res) => {
    try {
        let blogs = await BlogModel.find(req.query, { secretKey: 0 });
        if (blogs.length === 0) {
            res.status(404).json({ data: "", msg: "Data not found", err: "" });
        } else {
            res.status(200).json({ data: blogs, msg: "", err: "" });
        }
    } catch (err) {
        console.error("Error searching blogs:", err.message);
        res.status(500).json({ data: "", msg: "Unable to find data", err: err.message });
    }
};


const writeBlogs = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title || !data.content) {
            return res.status(400).json({ data: "", msg: "Title and content are required", err: "" });
        }
        const blog = new BlogModel(data);
        await blog.save();
        res.status(201).json({ 
            data: { 
                blog: blog,
                secretKey: blog.secretKey
            },
            msg: "Blog created successfully",
            err: ""
        });
    } catch (err) {
        console.error("Error writing blog:", err.message);
        res.status(500).json({ data: "", msg: "Unable to write data", err: err.message });
    }
};


const updateBlogs = async (req, res) => {
    try {
        let id = req.body._id;
        let data = req.body;
        delete data._id; 
        
        data.updatedAt = new Date();

      
        const result = await BlogModel.updateOne({ _id: id }, data);

        if (result.matchedCount === 0) {
            res.status(404).json({ data: "", msg: "Blog not found", err: "" });
        } else if (result.modifiedCount === 0) {
            res.status(304).json({ data: "", msg: "No changes made", err: "" });
        } else {
            res.status(200).json({ data: "", msg: "Data updated", err: "" });
        }
    } catch (err) {
        console.error("Error updating blog:", err.message);
        res.status(500).json({ data: "", msg: "Unable to update data", err: err.message });
    }
};

const deleteBlog = async (req, res) => {
    const id = req.params.id; 
    const key = req.params.key;
    
    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ data: "", msg: "Blog not found", err: "" });
        }
        const blogSecretKey = String(blog.secretKey).trim();
        const providedKey = String(key).trim();
        if (blogSecretKey !== providedKey) {
            return res.status(403).json({ data: "", msg: "Invalid secret key", err: "" });
        }
        const result = await BlogModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ data: "", msg: "Blog not found", err: "" });
        } else {
            res.status(200).json({ data: "", msg: "Blog deleted", err: "" });
        }
    } catch (err) {
        console.error("Error deleting blog:", err.message);
        res.status(500).json({ data: "", msg: "Unable to delete data", err: err.message });
    }
};
module.exports = {
    readBlogs,
    searchBlogs,
    writeBlogs,
    updateBlogs,
    deleteBlog
};
