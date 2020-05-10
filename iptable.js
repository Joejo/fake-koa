module.exports = async function iptable(ctx, next){
    const {req, res} = ctx;
    const ip = getClientIp();
    const blackLists = ['127.0.0.1'];

    if(blackLists.includes(ip)){
        ctx.body = 'not allowed';
    }else{
        await next();
    }

    function getClientIp(){
        const { connection, socket } = req;
        const connectionSocket = connection.socket || {};
        const connectionRemoteIp = connection.remoteAdress || '';
        const socketRemoteIp = socket.remoteAdress || '';
        const connectionSocketIp = connectionSocket.remoteAdress || '';

        return (
            req.headers['x-forward-for'] || // 判断是否有反向代理 IP
            connectionRemoteIp || // 判断 connection 的远程 IP
            socketRemoteIp || // 判断后端的 socket IP 
            connectionSocketIp
        );
    }
}