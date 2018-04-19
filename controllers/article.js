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
    let user =  await User.findOne({_id: uid}).sort("createdAt");
    const artItems = await Article.find({uid},null, {skip: (page-1)*20, limit:20});
    if(artItems) {
        ctx.body = { status: 0, msg: 'success', data: {
            Items: artItems.map( e => {
                return {
                    text: e.context,
                    images: e.image,
                    avatar_url: user.avatar,
                    nickName: user.nickname,
                    time: e.createdAt.getTime()
                }
            }),
            hasMore: (page-1)*20 + artItems.length < count,
        } };
    }
}
  module.exports = {
    'POST /createdArticle': createdArticle,
    'POST /getMyArticle': getMyArticle,
  };