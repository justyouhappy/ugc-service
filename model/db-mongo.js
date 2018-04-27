const mongoose = require('mongoose');    //引用mongoose模块
mongoose.connect('mongodb://localhost:54321/yuhuajian'); //创建一个数据库连接
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exporrts = db;