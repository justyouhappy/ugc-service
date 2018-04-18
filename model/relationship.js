const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const relationship = new Schema({
    uid: String,
    fid: String,
})
module.exports = mongoose.model('relationship', relationship);