const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let CategorySchema = new mongoose.Schema({
    name: String,
    movies: [{
        type: ObjectId,
        ref: 'Movie'
    }],
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

module.exports = CategorySchema;