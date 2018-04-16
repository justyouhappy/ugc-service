const User = require('../model/user.js');
// console.log(User);
var sigin = async (ctx, next) => {
    var username= ctx.request.body.username;
    var password = ctx.request.body.password;
    let user =  await User.findOne({username: username});
    if(password === user.password) {
        ctx.body = { status: 0, msg: '登录成功！' };
        ctx.session.uid = user._id;
    } else {
        ctx.body = { status: 1, msg: '密码或用户名错误' };
    }
  };
  var siginUp  = async (ctx, next) => {
      let { username, password, nickname, birthday, rename, sex, avatar, bg } = ctx.request.body;
      let user =  await User.findOne({username: username});
      if(user) {
          ctx.body = { status: 1, msg: '用户名已存在' };
          return;
      }
      let res = await User.create({ username, password, nickname, birthday, rename, sex, avatar, bg });
      if(res) {
          ctx.body = { status: 0, msg: '注册成功' };
      }
  };
  var getUserInfo  = async (ctx, next) => {
    let uid = ctx.session.uid;
    let user =  await User.findOne({_id: uid});
    if(user) {
        ctx.body = { status: 0, msg: 'success',data: {
            username: user.username,
            nickname: user.nickname,
            birthday: user.birthday,
            rename: user.rename,
            sex: user.sex,
            avatar: user.avatar,
            bg: user.bg
        }};
        return;
    }
  };
  var loginOut  = async (ctx, next) => {
    ctx.session.uid = '';
    ctx.body = { status: 0, msg: 'success'};
  }
  var updated = async (ctx, next) => {
    let { username, password, nickname, birthday, rename, sex, avatar, bg } = ctx.request.body;
    ctx.body = { status: 0, msg: 'success'};
  }
  
  module.exports = {
    'POST /sigin': sigin,
    'POST /siginUp': siginUp,
    'GET /getUserInfo': getUserInfo,
    'GET /loginOut': loginOut,
  };