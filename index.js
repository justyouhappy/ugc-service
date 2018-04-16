const Koa = require('koa');
const controller = require('./controller');
const bodyParser = require('koa-bodyparser');
const session = require("koa-session2");
const Store = require("./store.js");
const db = require('./model/db-mongo');
const beforeRes = require('./middleware/before-respose');
const app = new Koa();

app.use(bodyParser());
app.use(session({
    // store: new Store()
}));
app
    .use(beforeRes)
    .use(controller())
app.listen(3100);