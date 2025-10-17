const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware для задержки
server.use((req, res, next) => {
    setTimeout(() => next(), 2000); // 2с задержка для всех запросов
});

server.use(middlewares);
server.use(router);
server.listen(8000, () => {
    console.log('JSON Server running on port 3000 with delay');
});
