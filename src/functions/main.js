import connection from "../database.js";

export default async function main(req, res) {
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