import supertest from "supertest";
import app from "../app.js";
import connection from "../database.js";

describe("GET /main", () => {
    beforeAll(async () => {
        const token = "5fb6d321-99a5-43e3-b3f7-e42ff316d017";
        await connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2);`, [token, 1]);
    })

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