const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    authorName: { type: String, required: [true, "Please enter the author's name"] },
    title: { type: String, required: [true, "Please enter the title"] },
    content: { type: String, required: [true, "Please enter the content"] },
    createdAt:{type:Date} ,
    category:{type:String},


});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
