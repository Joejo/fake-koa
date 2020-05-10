const mykoa = require('./mykoa');
const app = new mykoa();
const Router = require('./router');
const static = require('./static');
const iptable = require('./iptable');
const router = new Router();

router.get('/', function(ctx, next){
    ctx.body = 'index';
});

router.get('/index', function(ctx, next){
    ctx.body = 'index';
});

router.get('/user', function(ctx, next){
    ctx.body = 'user';
});

//ignore favicon.ico
router.get('/favicon.ico', function(ctx, next){
    ctx.res.end();
});

app.use(router.routes());

// app.use(static(`${__dirname}/public`));
app.use(static(`${__dirname}`));
console.log(iptable);
app.use(iptable);

app.listen(3000);