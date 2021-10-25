import supertest from "supertest";
import app from "../app.js";
import connection from "../database.js";

beforeAll(async () => {
    const token = "5fb6d321-99a5-43e3-b3f7-e42ff316d017";
    await connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, 1]);
})

afterAll(async () => {
    await connection.query(`DELETE FROM sessions;`);
    await connection.query(`DELETE FROM entries;`);
})

describe("POST /main", () => {
    it("Returns 201 for valid request", async () => {
        const token = "5fb6d321-99a5-43e3-b3f7-e42ff316d017";
        const body = {
            description: "Testing entry",
            value: 10000,
            income: true
        }

        const result = await supertest(app)
            .post("/main")
            .set("Authorization", `Bearer ${token}`)
            .send(body);

        expect(result.status).toEqual(201);
    })

    it("Returns 400 for missing value param", async () => {
        const token = "5fb6d321-99a5-43e3-b3f7-e42ff316d017";
        const body = {
            description: "Testing entry",
            income: true
        }

        const result = await supertest(app)
            .post("/main")
            .set("Authorization", `Bearer ${token}`)
            .send(body);

        expect(result.status).toEqual(400);
    })

    it("Returns 400 for missing income param", async () => {
        const token = "5fb6d321-99a5-43e3-b3f7-e42ff316d017";
        const body = {
            description: "Testing entry",
            value: 10000
        }

        const result = await supertest(app)
            .post("/main")
            .set("Authorization", `Bearer ${token}`)
            .send(body);

        expect(result.status).toEqual(400);
    })

    it("Returns 400 for missing token param", async () => {
        const token = "";
        const body = {
            description: "Testing entry",
            value: 10000,
            income: true
        }

        const result = await supertest(app)
            .post("/main")
            .set("Authorization", `Bearer ${token}`)
            .send(body);

        expect(result.status).toEqual(400);
    })

    it("Returns 401 for valid token", async () => {
        const token = "NOT A REAL TOKEN";
        const body = {
            description: "Testing entry",
            value: 10000,
            income: true
        }

        const result = await supertest(app)
            .post("/main")
            .set("Authorization", `Bearer ${token}`)
            .send(body);

        expect(result.status).toEqual(401);
    })
})

describe("GET /main", () => {
    it("Returns 200 for valid request", async () => {
        const token = "5fb6d321-99a5-43e3-b3f7-e42ff316d017";
        const result = await supertest(app).get("/main").set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
    })

    it("Returns 400 for missing token param", async () => {
        const token = "";
        const result = await supertest(app).get("/main").set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(400);
    })

    it("Returns 401 for invalid token", async () => {
        const token = "NOT A REAL TOKEN";
        const result = await supertest(app).get("/main").set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(401);
    })
})