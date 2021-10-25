import connection from "../database.js";

async function getFromMain(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token || token === 'Bearer') return res.status(400).send("Missing token");

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        if(!user.rowCount) return res.sendStatus(401);

        const entries = await connection.query(`SELECT * FROM entries WHERE "userId" = $1;`, [user.rows[0].userId]);

        res.status(200).send(entries.rows);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

async function saveToMain(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token || token === 'Bearer') return res.status(400).send("Missing token");

    const date = new Date().toISOString().split('T')[0];
    const {
        description,
        value,
        income
    } = req.body;
    if(!income || !value) return res.sendStatus(400);

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        if(!user.rowCount) return res.sendStatus(401);
        
        await connection.query(`
            INSERT INTO entries (
                date,
                description,
                value,
                income,
                "userId"
            ) VALUES ($1, $2, $3, $4, $5);
        `, [date, description || "", value, income, user.rows[0].userId]);

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export {
    getFromMain,
    saveToMain
}