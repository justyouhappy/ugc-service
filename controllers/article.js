const Relationship = require('../model/relationship.js');
const User = require('../model/user.js');
const Article = require('../model/article.js');
var createdArticle = async(ctx, next) => {
    const {  context, image } = ctx.request.body;
    const uid = ctx.session.uid;
    const artItem = await Article.create({ uid, context, image });
    if(artItem) {
        ctx.body = { status: 0, msg: '发表成功' };
    }
}
var getMyArticle = async(ctx, next) => {
    const uid = ctx.session.uid;
    const {  page } = ctx.request.body;
    const count = await Article.count({uid});
    let user =  await User.findOne({_id: uid});
    const artItems = await Article.find({uid},null, {skip: (page-1)*20, limit:20, sort:{ createdAt: -1 }});
    if(artItems) {
        ctx.body = { status: 0, msg: 'success', data: {
            Items: artItems.map( e => {
                return {
                    text: e.context,
                    images: e.image,
                    avatar_url: user.avatar,
                    nickName: user.nickname,
                    time: e.createdAt.toString(),
                    id: e._id
                }
            }),
            hasMore: (page-1)*20 + artItems.length < count,
        } };
    }
}
var getMyFloowArticle = async(ctx, next) => {
    const uid = ctx.session.uid;
    let fids = await Relationship.find({uid});
    fids = fids.map(e => e.fid);
    const {  page } = ctx.request.body;
    const count = await Article.count({uid: {$in: fids}});
    if(count) {
        let user =  await User.find({_id: {$in: fids}});
        let userList = {};
        user.forEach(e => {
            userList[e._id] = e;
        });
        const artItems = await Article.find({uid: {$in: fids}},null, {skip: (page-1)*20, limit:20, sort:{ createdAt: -1 }});
        ctx.body = { status: 0, msg: 'success', data: {
            Items: artItems.map( e => {
                return {
                    text: e.context,
                    images: e.image,
                    avatar_url:userList[e.uid].avatar,
                    nickName: userList[e.uid].nickname,
                    time: e.createdAt.toString(),
                    id: e._id
                }
            }),
            hasMore: (page-1)*20 + artItems.length < count,
        } };
    } else {
        ctx.body = { status: 0, msg: 'success', data: {
            Items: [],
            hasMore: false,
        } };
    }
}
var getAllArticle = async(ctx, next) => {
    const uid = ctx.session.uid;
    const {  page } = ctx.request.body;
    const artItems = await Article.find({uid: {$ne: uid}},null, {skip: (page-1)*20, limit:20, sort:{ createdAt: -1 }});
    const count = await Article.count();
    let uids = artItems.map(e => e.uid);
    if(count) {
        let user =  await User.find({_id: {
            $in: uids,
            $ne: uid
        }});
        let userList = {};
        user.forEach(e => {
            userList[e._id] = e;
        });
        ctx.body = { status: 0, msg: 'success', data: {
            Items: artItems.map( e => {
                return {
                    text: e.context,
                    images: e.image,
                    avatar_url:userList[e.uid].avatar,
                    nickName: userList[e.uid].nickname,
                    time: e.createdAt.toString(),
                    id: e._id
                }
            }),
            hasMore: (page-1)*20 + artItems.length < count,
        } };
    } else {
        ctx.body = { status: 0, msg: 'success', data: {
            Items: [],
            hasMore: false,
        } };
    }
}
  module.exports = {
    'POST /createdArticle': createdArticle,
    'POST /getMyArticle': getMyArticle,
    'POST /getMyFloowArticle': getMyFloowArticle,
    'POST /getAllArticle': getAllArticle,
  };