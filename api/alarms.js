const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'json-server', 'db.json');

function loadDb() {
    const raw = fs.readFileSync(dbPath, 'utf-8');
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

    if (req.method !== 'GET') {
        res.status(405).end();
        return;
    }

    const deviceId = req.query.device_id;
    const db = loadDb();
    const alarms = (db.alarms || []).filter((a) => String(a.device_id) === String(deviceId));

    setTimeout(() => {
        res.status(200).json(alarms);
    }, 800);
};
