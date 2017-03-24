var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    author: String,
    text:String,
    data1: String,
    data2: String,
    data3: String,
    data4: String,
    data5: String,
})
var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;
