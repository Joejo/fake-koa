async function fn1(next){
    console.log('fn1 start');
    await delay();
    await next();
    console.log('fn1 end');
}
async function fn2(next){
    console.log('fn2 start');
    await delay();
    await next();
    console.log('fn2 end');
}
function fn3 (){
    console.log('fn3 start');
}

/* 
//洋葱圈模型原理
function reduceFn(...[first, ...args]){
    let ret = first();
    args.forEach(fn => {
        ret = fn(ret);
    });
} */

function delay(){
    return new Promise((res, rej)=>{
        setTimeout(() => {   
            console.log('delay');
            res();
        }, 2000);
    });
}

function compose(midwares){
    return function(ctx){
        return dispatch(0);
        console.log(i);
        function dispatch(i){
            const fn = midwares[i];

            if(!fn){
                return Promise.resolve();
            }

            return Promise.resolve(
                fn(ctx, function next(){
                    return dispatch(i + 1);
                })
            );
        }
    }
}

module.exports = compose;