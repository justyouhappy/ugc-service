const Relationship = require('../model/relationship.js');
const User = require('../model/user.js');

var fllow = async (ctx, next) => {
    const { id } = ctx.request.body;
    const uid = ctx.session.uid;
    const isFllowed = await Relationship.findOne({ uid, fid: id});
    if(isFllowed) {
        ctx.body = { status: 1, msg: 'failed'};
        return;
    }
    const rela = await Relationship.create({ uid, fid: id});
    if(rela) {
        ctx.body = { status: 0, msg: 'success'};       
    } else {
        ctx.body = { status: 1, msg: 'failed'};   
    }
  };
  var unFllow = async(ctx, next) => {
    const { id } = ctx.request.body;
    const uid = ctx.session.uid;
    const rela = await Relationship.remove({ uid, fid: id});
    if(rela) {
        ctx.body = { status: 0, msg: 'success'};       
    } else {
        ctx.body = { status: 1, msg: 'failed'};   
    }
  }
  var getUserFllowList = async(ctx, next) => {
    const uid = ctx.session.uid;
    let fids = await Relationship.find({uid});
    fids = fids.map(e => e.fid);
    const user =  await User.find({_id: { $in: fids}});
    if(user) {
        ctx.body = { status: 0, msg: 'success', data: user};       
    } else {
        ctx.body = { status: 1, msg: 'failed'};   
    }
  }
  module.exports = {
    'POST /fllow': fllow,
    'POST /unFllow': unFllow,
    'GET /getUserFllowList': getUserFllowList,
  };