const fs = require('fs');
const path = require('path');

function loadDb() {
    const filePath = path.join(process.cwd(), 'json-server', 'db.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        const db = loadDb();
        const devices = db.devices || [];

        const page = parseInt(req.query._page, 10) || 1;
        const limit = parseInt(req.query._limit, 10) || 10;
        const start = (page - 1) * limit;
        const end = start + limit;

        const result = devices.slice(start, end);

        res.setHeader('X-Total-Count', String(devices.length));

        setTimeout(() => {
            res.status(200).json(result);
        }, 800);
    } else {
        res.status(405).end();
    }
};
