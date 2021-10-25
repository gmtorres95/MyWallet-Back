import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../app.js";
import connection from "../database.js";

beforeAll(async () => {
    const name = "Test";
    const email = "test@email.com";
    const password = bcrypt.hashSync("1234", 10);
    await connection.query(`
    INSERT INTO users (
        name,
        email,
        password
    ) VALUES ($1, $2, $3);
    `, [name, email, password]);
})

afterAll(async () => {
    await connection.query(`DELETE FROM users;`);
    await connection.query(`DELETE FROM sessions;`);
})

describe("POST /sign-in", () => {
    it("Returns 200 for valid params", async () => {
        const body = {
            email: "test@email.com",
            password: "1234"
        }
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(200);
    })

    it("Returns 401 for invalid email", async () => {
        const body = {
            email: "test0@email.com",
            password: "1234"
        }
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(401);
    })

    it("Returns 401 for invalid password", async () => {
        const body = {
            email: "test@email.com",
            password: "0000"
        }
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(401);
    })
})