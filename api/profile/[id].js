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
        const { id } = req.query; // для /api/profile/1 вернётся "1"
        const db = loadDb();

        const profile =
            (db.profile || []).find(
                (p) => String(p.userId) === String(id) || String(p.id) === String(id),
            ) || null;

        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }

        res.status(200).json(profile);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message || 'Internal error' });
    }
};
