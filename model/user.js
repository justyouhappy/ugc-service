const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    nickname: String,
    username: {
        type:String,
        unique: true,
    },
    password: String,
    birthday: String,
    rename: String,
    sex: String,
    avatar: {
        type: String, 
        default: 'http://oj7h98lzb.bkt.clouddn.com/avatar' + Date.now()%10 +'.jpeg?imageView2/1/w/250/h/169/interlace/1/q/100'
    },
    bg: {
        type: String, 
        default: 'http://oj7h98lzb.bkt.clouddn.com/avatar' + Date.now()%9 +'.jpeg?imageView2/1/w/250/h/169/interlace/1/q/100'
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
})
module.exports = mongoose.model('user', user);