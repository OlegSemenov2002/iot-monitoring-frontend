const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// имитация задержки
server.use(async (req, res, next) => {
    await new Promise((res) => setTimeout(res, 800));
    next();
});

// Логин
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) return res.json(userFromBd);

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// проверка авторизации
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }
    next();
});

// Генерация нового случайного сигнала
server.post('/alarms/generate', (req, res) => {
    try {
        const dbPath = path.resolve(__dirname, 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        db.alarms = db.alarms || [];

        const newAlarm = {
            id: db.alarms.length ? Math.max(...db.alarms.map(a => a.id)) + 1 : 1,
            device_id: Math.floor(Math.random() * 10) + 1,
            date_time: new Date().toISOString(),
            notify: Math.random() > 0.5 ? 1 : null,
            date_fix: null,
            notify_lk: 0,
            notify_sms: Math.floor(Math.random() * 3)
        };

        db.alarms.push(newAlarm);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');

        res.json(newAlarm);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
