const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const article = new Schema({
    uid: String,
    context: String,
    image: Array,
    createdAt: {
        type: Date, 
        default: Date.now()
    },
})
module.exports = mongoose.model('article', article);