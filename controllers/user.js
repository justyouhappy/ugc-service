const User = require('../model/user.js');
const Relationship = require('../model/relationship.js');
var sigin = async (ctx, next) => {
    var username= ctx.request.body.username;
    var password = ctx.request.body.password;
    let user =  await User.findOne({username: username});
    if(!user) {
        ctx.body = { status: 1, msg: '用户名不存在' };
        return;
    }
    if(password === user.password) {
        ctx.body = { status: 0, msg: '登录成功！' };
        ctx.session.uid = user._id;
    } else {
        ctx.body = { status: 1, msg: '密码或用户名错误' };
    }
  };
  var siginUp  = async (ctx, next) => {
      let { username, password, nickname, birthday, rename, sex } = ctx.request.body;
      let user =  await User.findOne({username: username});
      if(user) {
          ctx.body = { status: 1, msg: '用户名已存在' };
          return;
      }
      let res = await User.create({ username, password, nickname, birthday, rename, sex});
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
    ctx.session.uid = null;
    ctx.body = { status: 0, msg: 'success'};
  }
  var searchUser  = async (ctx, next) => {
    const { value } = ctx.request.body;
    const uid = ctx.session.uid;
    const reg = new RegExp(`${value}`, 'i');
    try {
        const data = await new Promise((resolve, reject) => {
            User.find({ nickname: reg, _id: { $ne: uid } },function (err, data) {
                if (err) reject(err);
                resolve(data);
            })
        })
        let fids = [];
        if(uid) {
            fids = await Relationship.find({uid});
            fids = fids.map(e => e.fid);
        }
        datas = data.map(e => {
            if(fids.indexOf(e._id + '') !== -1) {
                return {
                    nickname: e.nickname,
                    avatar: e.avatar,
                    birthday: e.birthday,
                    isFllow: true,
                    _id: e._id
                }
            } else {
                return {
                    nickname: e.nickname,
                    avatar: e.avatar,
                    birthday: e.birthday,
                    isFllow: false,
                    _id: e._id
                }
            }
        });
        ctx.body = { status: 0, msg: 'success', data: datas};       
    } catch (e) {
        ctx.body = { status: 1, msg: e.message};        
    }
  }
  var updatedUser = async (ctx, next) => {
    let { password, nickname, birthday, rename, sex, avatar, bg } = ctx.request.body;
    let user =  await User.findOne({_id: ctx.session.uid});
    let newuser = await User.update({_id: ctx.session.uid}, {$set: {
        password: password || user.password,
        nickname: nickname || user.nickname,
        birthday: birthday || user.birthday,
        avatar: avatar || user.avatar,
        bg: bg || user.bg,
        rename: rename || user.rename,
        sex: sex || user.sex
    }})
    user =  await User.findOne({_id: ctx.session.uid});
    if(newuser) {
        ctx.body = { status: 0, msg: 'success', data: {
            user,
        }};
    } else {
        ctx.body = { status: 1, msg: 'failed', data: {
            user,
        }};
    }
  }
  
  module.exports = {
    'POST /sigin': sigin,
    'POST /siginUp': siginUp,
    'GET /getUserInfo': getUserInfo,
    'GET /loginOut': loginOut,
    'POST /updatedUser': updatedUser,
    'POST /searchUser': searchUser,
  };