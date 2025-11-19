const db = require('../db.json');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'GET') {
        const deviceId = req.query.device_id;
        const alarms = (db.alarms || []).filter(a => a.deviceId == deviceId);

        setTimeout(() => {
            res.status(200).json(alarms);
        }, 800);
    }
};
