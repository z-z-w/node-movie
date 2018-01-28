const express = require('express');
const router = express.Router();
const User = require('../models/user');

//统一返回格式
let data = {};
router.use(function (req, res, next) {
   data = {
       code: 0,
       message: ''
   };
   next();
});


//注册
router.post('/signup', function(req, res){
    //bodyParser这个中间件可以把下面获取到的数据解析成一个对象
    let _user = {
        name: req.body.name,
        password: req.body.password
    };

    if(_user.name == ''){
        data = {
            code: 1,
            message: '用户名不能为空'
        };
        res.json(data);
        return;
    }

    if(_user.password == ''){
        data = {
            code: 2,
            message: '密码不能为空'
        };
        res.json(data);
        return;
    }

    if(req.body.role != ''){
        _user.role = req.body.role;
    }


    User.findOne({
        name: _user.name
    }).then(function (user) {
        if(user){
            data = {
                code: 3,
                message: '该用户名已经存在'
            };
            res.json(data);
            return;
        }
        //如果用户名不存在就保存
        return new User(_user).save()
    }).then(function () {
        data.message =  '注册成功';
        res.json(data);
        return;
    })
});

//登录
router.post('/signin', function (req, res) {
   let name = req.body.name;
   let password =req.body.password;

   User.findOne({
       name:name
   }).then(function (hasUser) {
       if(!hasUser){
           data = {
               code: 1,
               message: '用户名不存在'
           };
           res.json(data);
           return Promise.reject();
       }else{
           return User.findOne({
               name: name,
               password: password
           })
       }
   }).then(function (user) {
       if(!user){
           data = {
               code: 2,
               message: '密码不正确'
           };
           res.json(data);
           return;
       }
       req.session.user = user;
       data.message = '登录成功';
       res.json(data);
       return;
   });

});

//登出
router.get('/logout', function (req, res) {

    delete req.session.user;

    res.json(data);
});


module.exports = router;