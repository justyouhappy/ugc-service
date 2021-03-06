const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const relationship = new Schema({
    uid: String,
    fid: String,
    createdAt: {
        type: Date, 
        default: Date.now()
    },
})
module.exports = mongoose.model('relationship', relationship);