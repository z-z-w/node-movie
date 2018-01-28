const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
   doctor: String,
   title: String,
   language: String,
   country: String,
   summary: String,
   flash: String,
   poster: String,
   year: String,
    pv: {
        type: Number,
        default: 0
    },
   category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category'
   },
   meta: {
       createAt: {
           type: Date,
           default: Date.now()
       },
       updateAt: {
            type: Date,
            default: Date.now()
       }
    }
});

module.exports = MovieSchema;

