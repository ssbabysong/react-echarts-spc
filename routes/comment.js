var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');
var Comment = require('./schema.js');

exports.list = function(req, res){  
  Comment.find(function(err, comment) {
    res.json(comment);  
  })
};  

exports.get = function(req, res){  
   if(comments.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No comment found');
  }  
  var q = comments[req.params.id];
  res.json(q); 
};  
  
  
exports.delete = function(req, res, next){
  console.log(req.params.id);
  Comment.remove({_id: req.params.id}, function(err,status){
    if(err){console.log(err)};
    next();
    }) 
};  
  
  
exports.update = function(req, res){  
  res.setHeader('Content-Type', 'application/json;charset=utf-8'); 
  for(var i=0;i<comments.length;i++){
    if(comments[i].author==req.body.author){
      comments[i] = req.body;  
      res.send({status:"success", message:"update comment success"});  
      console.log(comments);        
    }
  } 
};  

exports.add = function(req, res, next){  
  if(!req.body.author || 
     !req.body.text ||
     !req.body.data1|| 
     !req.body.data2|| 
     !req.body.data3|| 
     !req.body.data4|| 
     !req.body.data5) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  } 
 
  var newComment = {
    author : req.body.author,
    text :req.body.text,
    data1 : req.body.data1,
    data2 : req.body.data2,
    data3 : req.body.data3,
    data4 : req.body.data4,
    data5 : req.body.data5,
  }; 
  var NewComment = new Comment(newComment);
  NewComment.save(function(err){
    if(err){console.log(err)};
    next();
  }); 
};





















// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/comments');
// var Comment = require('./schema.js');

// exports.list = function(req, res){  
//   Comment.find(function(err, comment) {
//     res.json(comment);  
//   })
// };  

// exports.get = function(req, res){  
//    if(comments.length <= req.params.id || req.params.id < 0) {
//     res.statusCode = 404;
//     return res.send('Error 404: No comment found');
//   }  
//   var q = comments[req.params.id];
//   res.json(q); 
// };  
  
  
// exports.delete = function(req, res, next){
//   console.log(req.params.id);
//   Comment.remove({_id: req.params.id}, function(err,status){
//     if(err){console.log(err)};
//     next();
//     }) 
// };  
  
  
// exports.update = function(req, res){  
//   res.setHeader('Content-Type', 'application/json;charset=utf-8'); 
//   for(var i=0;i<comments.length;i++){
//     if(comments[i].author==req.body.author){
//       comments[i] = req.body;  
//       res.send({status:"success", message:"update comment success"});  
//       console.log(comments);        
//     }
//   } 
// };  

// exports.add = function(req, res, next){  
//   if(!req.body.author || 
//      !req.body.text) {
//     res.statusCode = 400;
//     return res.send('Error 400: Post syntax incorrect.');
//   } 
 
//   var newComment = {
//     author : req.body.author,
//     text : req.body.text
//   }; 
//   var NewComment = new Comment(newComment);
//   NewComment.save(function(err){
//     if(err){console.log(err)};
//     next();
//   }); 
// };
