const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Movie = require('../models/movie');
const Page = require('../public/js/page');

let data = {
    limit: 6,
};


router.get('/', function(req, res){

    Category.find({})
        .populate({path: 'movies', options: {limit: 6, sort: {_id:-1}}})
        .then(function (categories) {
            res.render('index', {
                title: '首页',
                categories: categories,
                user: req.session.user
            });
    });

});

//搜索页面
router.get('/results', function (req, res) {

    let _data = {};

    //搜索电影
    if(!req.query.cat){
        let q = req.query.q;
        data.page = req.query.page || 1;
        data.url = '/results?q=' + q + '&';

        Movie.find({
            title: new RegExp(q + '.*', 'i')
        }).count().then(function (count) {
            if(count <= 0) {
                res.render('error', {
                    title: '错误页面',
                    message: '没有搜索词 “' + q + '” 的电影。',
                    user: req.session.user
                });
                return Promise.reject();
            }else{
                _data = Page.returnPage(count, data);

                return Movie.find({
                    title: new RegExp(q + '.*', 'i')
                }).sort({_id: -1}).limit(_data.limit).skip(_data.skip);
            }
        }).then(function (movies) {

            if(req.session.user && req.session.user.role > 10){
                res.render('list', {
                    title: '结果列表页面',
                    movies: movies,
                    data: _data,
                    user: req.session.user,
                });
            }
            res.render('results', {
                title: '结果列表页面',
                keyword: q,
                movies: movies,
                data: _data,
                user: req.session.user,
            });

        });
    }else{ //通过点击分类链接搜索的电影
        const catId = req.query.cat;
        data.page = req.query.page || 1;

        data.url = '/results?cat=' + catId + '&';

        Movie.where({
            category: catId
        }).count().then(function (count) {
            _data = Page.returnPage(count, data);

            return Movie.where({category: catId}).find().sort({_id: -1}).limit(_data.limit).skip(_data.skip).populate('category', 'name');
        }).then(function (movies) {
            res.render('results', {
                title: '结果列表页面',
                keyword: movies[0].category.name,
                movies: movies,
                user: req.session.user,
                data: _data
            });
        });
    }


});




module.exports = router;