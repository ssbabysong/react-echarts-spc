var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var comm = require('./routes/comment');
var addon = require("./build/Release/addon");

var app = express();
app.use(session({ 
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
	cookie:{ 
		maxAge: 1000*60*30
	}
}));

var engine = require('consolidate');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(logger('dev'));// 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.json());// 调用bodyParser模块以便程序正确解析body传入值
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){ 
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = "";
	if(err){ 
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
	}
	next();
});

app.get('/', function (req, res,next) {
	if(!req.session.user){
		req.session.error="请先登陆"
		res.redirect('/login');
	}
    res.render('index');
});
app.get('/login',function(req,res){
	res.render('login');
});
app.post('/login',comm.login);
app.get('/register',function(req,res){
	res.render('register');
})
app.post('/register',comm.register);
app.get('/logout',function(req,res){
	req.session.user=null;
	req.session.error=null;
	res.redirect('/');
});
app.get('/user',function(req,res){
	var use=req.session.user;
	res.json(use);
	console.log(use);
})
app.get('/product', comm.list);
app.post('/product', comm.adddata);
app.post('/addproduct', comm.addproduct,comm.list);    

// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('mongod --dbpath  /Users/bali/document/develop/mongo/data   Listening at http://%s:%s', host, port);
}); 

module.exports = app;
