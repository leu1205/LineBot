const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./route');
const app = new koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});