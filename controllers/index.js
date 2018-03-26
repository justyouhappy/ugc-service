var index = async (ctx, next) => {
  ctx.response.body =[{1:'通过网络请求发现',2:'于华健最帅'}];
};

var signin = async (ctx, next) => {
  var name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
      ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
};

module.exports = {
  'GET /': index,
  'POST /signin': signin
};