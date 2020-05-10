const path = require('path');
const fs = require('fs');

module.exports = function static(dirPath){
    return async function(ctx, next){
        let ret = [];
        const url = path.resolve(__dirname, dirPath);
        const staticUrls = ['static', 'public'];
        const str = ctx.url.replace(/\//g, '');
        if(staticUrls.indexOf(str) < 0){
            await next();
        }
        // get actual full path
        const filepath = url + ctx.url;
        const dir = fs.statSync(filepath);
        if(dir.isDirectory()){
            const files = fs.readdirSync(filepath);
            console.log(files);
            if(files.length === 0){
                ctx.body = '404 not found';
                return;
            }
            files.forEach(item => {
                ret.push(`
                    <p>
                        <a href='${ctx.url + item}'>${item}</a>
                    </p>
                `);
            })
            ctx.body = ret.join('');
        }else{
            const content = fs.readFileSync(filepath);
            ctx.body = content;
        }

        await next();
    }
}