const db = require('../db.json');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method === 'GET') {
        let devices = db.devices || [];

        const page = parseInt(req.query._page) || 1;
        const limit = parseInt(req.query._limit) || 10;
        const start = (page - 1) * limit;
        const end = start + limit;

        const result = devices.slice(start, end);

        setTimeout(() => {
            res.status(200).json(result);
        }, 800);
    } else {
        res.status(405).end();
    }
};
