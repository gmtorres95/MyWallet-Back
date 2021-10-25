import supertest from "supertest";
import app from "../app.js";
import connection from "../database.js";

beforeAll(async () => {
    const token = "c671fc1f-f2f9-4eb6-92d2-02b7a6fd0a70"
    await connection.query(`
        INSERT INTO sessions (
            token,
            "userId"
        ) VALUES ($1, $2);
    `, [token, 1]);
})

describe("DELETE /sign-ou", () => {
    it("Returns 200 for valid params", async () => {
        const token = "c671fc1f-f2f9-4eb6-92d2-02b7a6fd0a70"

        const result = await supertest(app).delete("/sign-out").set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
    })

    it("Returns 400 for missing token param", async () => {
        const token = ""

        const result = await supertest(app).delete("/sign-out").set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(400);
    })
})