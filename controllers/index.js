var index = async (ctx, next) => {
  ctx.response.body =[{1:'通过网络请求发现',2:'于华健最帅'}];
};

module.exports = {
  'GET /': index,
};