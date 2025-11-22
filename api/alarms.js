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

    try {
        const deviceId = req.query.device_id;
        const db = loadDb();
        const alarms = (db.alarms || []).filter(
            (a) => !deviceId || String(a.device_id) === String(deviceId),
        );

        res.status(200).json(alarms);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message || 'Internal error' });
    }
};
