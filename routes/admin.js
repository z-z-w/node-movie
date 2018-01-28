const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const User = require('../models/user');
const Category = require('../models/category');
const Page = require('../public/js/page');

let data = {
    limit: 6,
};


router.use(function (req, res, next) {
   if(!(req.userInfo.role > 10)){
       res.render('error', {
           title: '错误页面',
           message: '该页面只有管理员才能进入'
       });
       return;
   }
   next();
});

router.get('/movie', function(req, res){

    Category.find().then(function (categories) {
        res.render('admin', {
            title: '后台录入页',
            categories: categories,
            movie: {
                category: '',
                doctor: '',
                title: '',
                language: '',
                country: '',
                summary: '',
                flash: '',
                poster: '',
                year: '',
            },
            user: req.session.user
        });
    });

});

//电影更新 这里只是跳转页面
router.get('/update/:id', function (req, res) {
    let id = req.params.id;
    let categories = {};

    if(id){
        Category.find().then(function (categoriesInfo) {
            categories = categoriesInfo;
            return Movie.findOne({
                _id: id
            });
        }).then(function (movie) {
            res.render('admin', {
                title: '后台更新页',
                movie: movie,
                categories: categories,
                user: req.session.user
            });
        });

    }
});


//电影的发布
router.post('/movie/new', function(req, res){
    let id = req.body.movie._id || '';
    let movieObj = req.body.movie;


    if(id !== ''){
         Movie.update({
             _id: id
             }, movieObj
         ).then(function () {
            res.redirect('/movie/' + id);
        });
        //电影更新 这里才是电影的更新保存

    }else{
        //添加了新的电影
        if(movieObj.title == '' || movieObj.flash == ''){
            res.render('error', {
                title: '错误页面',
                message: '电影名字或者电影片源不能为空',
                user: req.session.user
            });
        }else{
            new Movie(movieObj).save().then(function (newMovie) {
                Category.findById(newMovie.category).then(function (categoryInfo) {
                    categoryInfo.movies.push(newMovie._id);
                    return categoryInfo.save();
                }).then(function () {
                    res.redirect('/admin/list');
                });
            });
        }
    }
});

//电影list
router.get('/list', function(req, res){
    const id = req.query.id || '';

    data.page = req.query.page || 1;
    data.url = '/admin/list?';

    //判断这个id是否存在再添加查询条件
    //若存在则根据电影分类的id来查询到该分类下的所有电影
    //若不存在则查询所有电影
    let where = {};
    if(id){
        where.category = id;
        data.url = '/admin/list?id=' + id + '&';
    }
    Movie.where(where).count().then(function (count) {
        _data = Page.returnPage(count, data);

        return Movie.where(where).find().sort({_id: -1}).limit(_data.limit).skip(_data.skip).populate('category', 'name');
    }).then(function (movies) {
        let title = '';
        if(id){
            title = movies[0].category.name + '分类电影列表页';
        }
        res.render('list', {
            title: title ?  title : '电影列表页',
            movies: movies,
            user: req.session.user,
            data: _data
        });
    });


});

//删除
router.post('/movie/delete', function (req, res) {
    let id = req.body.id || '';
    let data = {
        code: 0
    };

    if(id != ''){
        Movie.remove({
            _id: id
        }).then(function(){
            res.json(data);
            return;
        });
    }
});

//userList
router.get('/userList', function(req, res){

    data.page = req.query.page || 1;
    data.url = '/admin/userList?';

    User.where({
        role: {$lt: 10}
    }).count().then(function (count) {
        _data = Page.returnPage(count, data);

        return User.where({
            role: {$lt: 10}
        }).find().sort({_id: -1}).limit(_data.limit).skip(_data.skip)
    }).then(function (users) {
        res.render('userList', {
            title: '用户列表页',
            users: users,
            user: req.session.user,
            data: _data
        });
    });
});

//管理员list
router.get('/adminList', function(req, res){
    data.page = req.query.page || 1;
    data.url = '/admin/adminList?';

    User.where({
        role: {$gt: 10}
    }).count().then(function (count) {
        _data = Page.returnPage(count, data);

        return User.where({
            role: {$gt: 10}
        }).find().sort({_id: -1}).limit(_data.limit).skip(_data.skip);
    }).then(function (users) {
        res.render('userList', {
            title: '用户列表页',
            users: users,
            user: req.session.user,
            data: _data
        });
    });
});

//电影分类录入页
router.get('/category', function (req, res) {
    res.render('categoryAdmin', {
        title: '电影分类录入页',
        category: {
            name: ''
        },
        user: req.session.user
    });
});

//电影分类加入
router.post('/category', function (req, res) {
    const catgegory = req.body.category;
    const name = catgegory.name;

    Category.findOne({
        name: name
    }).then(function (categoryInfo) {
        if(categoryInfo){
            res.render('error', {
                title: '错误页面',
                message: '该分类已经存在'
            });
            return Promise.reject();
        }
        return new Category(catgegory).save();
    }).then(function () {
        res.redirect('/admin/categoryList')
    });
});

router.get('/categoryList', function (req, res) {
    data.page = req.query.page || 1;
    data.url = '/admin/categoryList?';

    Category.count().then(function (count) {
        _data = Page.returnPage(count, data);

        return Category.find().sort({_id: -1}).limit(_data.limit).skip(_data.skip);
    }).then(function (categories) {
        res.render('categoryList', {
            title: '电影分类页',
            categories: categories,
            user: req.session.user,
            data: _data
        });
    });

});

module.exports = router;