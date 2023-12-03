const { WebSocket, WebSocketServer } = require("ws")
const jwt = require("jsonwebtoken");

const server = new WebSocketServer({
    port: 8080,
    verifyClient: (info, done) => {
        let token = info.req.headers['sec-websocket-protocol']
        if (token) {
            token = token.split('access_token, ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) {
                    console.error("Acesso negado - Token invalido");
                    done(false, 403, "Acesso negado - Token invalido");
                } else {
                    info.req.user = payload;
                    done(true);
                }
            });
        } else {
            done(false, 401, "Nenhum token fornecido");
        }
    }
});

let notifications = []

server.on('connection', function connection(socket, req) {
    socket.userId = req.user.idLogged;

    socket.on('error', console.error);

    const sendNotification = () => {
        server.clients.forEach(function each(client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                notifications.forEach((notification) => {
                    if(notification.users.includes(client.userId)) {
                        client.send(notification.msg, { binary: false });
                        notification.users = notification.users.filter(id => id !== client.userId);
                    }
                })
                notifications = notifications.filter((notification) => notification.users.length !== 0)
            }
        });
    }

    const intervalNotification = setInterval(function ping() {
        sendNotification()
    }, 3000);

    socket.on('close', function() {
        clearInterval(intervalNotification);
    });

});

const addNotification = (data) => {
    notifications.push(data)
}


module.exports = { server, addNotification }
