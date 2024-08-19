
const mongoose = require('mongoose');
const crypto = require('crypto'); 
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    authorName: { 
        type: String, 
        required: [true, "Please enter the author's name"] 
    },
    title: { 
        type: String, 
        required: [true, "Please enter the title"] 
    },
    content: { 
        type: String, 
        required: [true, "Please enter the content"] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt:{ 
        type: Date, 
        default: Date.now 
    },
    secretKey: { 
        type: String, 
        unique: true 
    }
});


blogSchema.pre('save', function(next) {
    if (!this.secretKey) {
        this.secretKey = crypto.randomBytes(32).toString('hex'); 
    }
    next();
});

const BlogModel = mongoose.model('Blog', blogSchema);
module.exports = BlogModel;
