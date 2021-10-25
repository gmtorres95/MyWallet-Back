import connection from "../database.js";
import bcrypt from "bcrypt";

export default async function signUp(req, res) {
    const {
        name,
        email,
        password
    } = req.body;
    if(!name || !email || !password || password.length < 4) return res.send(400);
    const hash = bcrypt.hashSync(password, 10);

    try {
        const duplicate = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if(duplicate.rowCount) return res.sendStatus(409);

        await connection.query(`
            INSERT INTO users (
                name,
                email,
                password
            ) VALUES ($1, $2, $3);
        `, [name, email, hash]);

        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}