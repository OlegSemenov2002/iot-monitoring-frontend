// api/login.js
const fs = require('fs');
const path = require('path');
const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../db.json'), 'UTF-8'));

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const user = (db.users || []).find(u => u.username === username && u.password === password);

        setTimeout(() => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: 'User not found' });
            }
        }, 800);
    } else {
        res.status(405).end();
    }
};