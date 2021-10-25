import connection from "../database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export default async function signIn(req, res) {
    const {
        email,
        password
    } = req.body;
    if(!email || !password || password.length < 4) return res.send(400);

    try {
        const result = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if(!result.rowCount) return res.status(401).send("Wrong email!");

        const user = result.rows[0];

        if(bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            
            await connection.query(`
                INSERT INTO sessions (
                    token,
                    "userId"
                ) VALUES ($1, $2);
            `, [token, user.id]);
            
            delete user.password;
            const login = {
                token,
                user
            };

            res.status(200).send(login);
        } else return res.status(401).send("Wrong password!");
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}