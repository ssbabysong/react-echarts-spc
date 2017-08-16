var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pro');

var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function (callback) {
    console.log('MongoDB Opened!');
  });

var UserSchema = new mongoose.Schema({ 
    name:{type:String,required:true},
    password:{type:String,required:true}
  });
var User = mongoose.model('User',UserSchema);


var DataSchema = new mongoose.Schema({
    name: String,
    data1: Number,
    data2: Number,
    data3: Number,
    data4: Number,
    data5: Number,
    timestamp:{ type: Date, default: Date.now }
});

var Data = mongoose.model('Data', DataSchema);
var ProductSchema = new mongoose.Schema({
  name:String,
  ucl:Number,
  cl:Number,
  lcl:Number,
  data:[DataSchema]
}, {_id: true});
var Product = mongoose.model('Product',ProductSchema);

exports.list = function(req, res){  
  Product.find(function(err, product) {
    res.json(product); 
    console.log(product); 
  })
};  

exports.adddata = function(req, res, next){  
   var newData = {
    name : req.body.name,
    data1 : req.body.data1,
    data2 : req.body.data2,
    data3 : req.body.data3,
    data4 : req.body.data4,
    data5 : req.body.data5
  }; 
  // console.log(req.body.parent);
  Product.findOne({_id:req.body.parent}).exec(function(err,product){
    var NewData = new Data(newData);
    product.data.push(NewData);
    product.save(function(err){
      if(err){console.log(err);}
      else{
        Product.find(function(err, product) {
        res.json(product); 
      })
      }
    })
  })
};

exports.addproduct = function(req, res, next){  
  var newProduct = {
    name : req.body.name,
    ucl:req.body.ucl,
    lcl:req.body.lcl,
    cl:req.body.cl,
    data:[]
  }; 
  var NewProduct = new Product(newProduct);
  NewProduct.save(function(err){
    if(err){console.log(err)};
    next();
  }); 
};

exports.login = function(req,res){
  var uname=req.body.uname;
  User.findOne({name:uname},function(err,doc){
    if(err){res.send(500);console.log(err);}
    else if(!doc){
      req.session.error='用户名不存在';
      res.send(404);
    }
    else{
      if(req.body.upwd != doc.password){  //查询到匹配用户名的信息，但相应的password属性不匹配
        req.session.error = "密码错误";
        res.send(404);
      //  res.redirect("/login");
      }else{                  //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
        req.session.user = doc;
        res.send(200);
      //  res.redirect("/");
      }
    }
  })
};

exports.register= function(req,res){
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  User.findOne({name:uname},function(err,doc){
    if(err){
      res.send(500);
      console.log(err);
    }
    else if(doc){
      req.session.error = '用户名已存在';
      res.send(500);
    }
    else{
      var us=new User({
        name:uname,
        password:upwd});
      us.save(function(err,doc){
        if(err){
          res.send(500);
          console.log(err);
        }
        else{
          req.session.error='用户名创建成功';
          res.send(200);
        }
      })
    }
  })
};





























