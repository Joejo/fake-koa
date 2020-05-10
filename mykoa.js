const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const compose = require('./midwares');

class mykoa{
    constructor(){
        this.midwares = [];
    }

    listen(...args){
        const server = http.createServer(async (req, res) => {
            const ctx = this.createContext(req, res);
            const fns = compose(this.midwares);
            await fns(ctx);
            res.end(ctx.body);
        });
        server.listen(...args);
    }

    use(midware){
        this.midwares.push(midware);
    }

    // 构建上下文
    createContext(req, res){
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
}

module.exports = mykoa;