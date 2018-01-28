const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const dburl = 'mongodb://localhost:27018/movie';
const User = require('./models/user');
const port = process.env.PORT || 3000;
const app = express();

//设置视图模板
app.set('views', './views/pages');
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({extended : true}));
app.use('/public',express.static(__dirname + '/public'));
app.locals.moment = require('moment');
app.use(session({
    secret: 'zzw',
    store: new mongoStore({
        url: dburl,
        collection: 'sessions'
    })
}));

//设置用户权限
app.use(function (req, res, next) {
    req.userInfo = {};

    if(req.session.user){
        try{
            User.findOne({
                name: req.session.user.name
            }).then(function (hasUser) {
                req.userInfo = hasUser;
                next();
            });
        } catch (e) {
            next();
        }
    } else{
        next();
    }
});


/**
 * 根据不同的功能划分模块
 */
app.use('/comment', require('./routes/comment'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/movie', require('./routes/movie'));
app.use('/', require('./routes/index'));

//数据库的连接
mongoose.connect(dburl, function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(port);
    }
});