const mongoose = require('mongoose');
const CategorySchema = require('../schemas/category');
let Category = mongoose.model('Category', CategorySchema);

module.exports = Category;