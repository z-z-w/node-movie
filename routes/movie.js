const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Comment = require('../models/comment');

router.get('/:id', function(req, res){
    let id = req.params.id;
    let movieInfo = {};


    //if(id !== ''){
    Movie.update({_id: id}, {$inc: {pv: 1}}).then(function () {
        return Movie.findOne({
            _id: id
        });
    }).then(function (result) {
            movieInfo = result;
            return Comment.find({
                movie: id
            }).populate('from reply.from reply.to', 'name')
    }).then(function (comments) {
        res.render('detail', {
            title: movieInfo.title,
            movie: movieInfo,
            user: req.session.user,
            comments: comments
        });
    });
    //}



});


module.exports = router;