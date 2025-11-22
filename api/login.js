const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'json-server', 'db.json');

function loadDb() {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }

    try {
        const db = loadDb();
        const admin =
            (db.users || []).find((u) => u.id === '1') ||
            (db.users || []).find((u) => u.username === 'admin');

        if (!admin) {
            res.status(500).json({ message: 'Admin user not found in db.json' });
            return;
        }

        const { password: _pw, ...safeAdmin } = admin;

        setTimeout(() => {
            res.status(200).json(safeAdmin);
        }, 300);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message || 'Internal error' });
    }
};
