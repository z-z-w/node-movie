const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

let data = {
    code: 0,
};

router.post('/', function (req, res) {
    let comment = req.body.comment;

    //是否是回复评论
    if(comment.cid){
        Comment.findById(comment.cid).then(function (result) {
            let reply = {
                from: comment.from,
                to: comment.tid,
                content: comment.content
            };

            result.reply.push(reply);

            return result.save();
        }).then(function (result) {
            data.comment = result;
            res.json(data);
            return;
        })
    }else{
        new Comment(comment).save().then(function (result) {
            data.comment = result;
            res.json(data);
            return;
        });
    }
});


module.exports = router;