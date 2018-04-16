var index = async (ctx, next) => {
    let uid = ctx.session.uid;
    if(uid || ctx.path === '/sigin' || ctx.path === '/siginUp') {
        console.log('is sigined or sigining')
        await next();
    } else {
          ctx.body = { status: 1, msg: '未登录' };
    }
};
module.exports = index;