class Router{
    constructor(){
        this.stack = [];
    }

    register(path, method, middlewares){
        let route = {path, method, middlewares};
        this.stack.push(route);
    }

    get(path, middlewares){
        this.register(path, 'get', middlewares);
    }

    post(path, middlewares){
        this.register(path, 'post', middlewares);
    }

    routes(){
        let stock = this.stack;
        return async function(ctx, next){
            let contentPath = ctx.url;
            let method = ctx.method;
            let route;
            for(let i = 0; i < stock.length; i++){
                const item = stock[i];
                if(contentPath === item.path && item.method === method){
                    route = item.middlewares;
                    break;
                }
            }

            if(typeof route === 'function'){
                route(ctx, next);
                return;
            }

            await next();
        }
    }
}

module.exports = Router;