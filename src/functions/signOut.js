import connection from "../database.js";

export default async function signOut(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token || token === 'Bearer') return res.status(400).send("Missing token");

    try {
        await connection.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
        
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}