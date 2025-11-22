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

    const { username, password } = req.body || {};
    const db = loadDb();

    const user = (db.users || []).find(
        (u) => u.username === username && u.password === password,
    );

    setTimeout(() => {
        if (!user) {
            res.status(403).json({ message: 'User not found' });
            return;
        }

        const { password: _pw, ...safeUser } = user;
        res.status(200).json(safeUser);
    }, 800);
};
