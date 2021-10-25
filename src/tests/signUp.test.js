import supertest from "supertest";
import app from "../app.js";
import connection from "../database.js";

describe("POST /sign-up", () => {
    beforeAll(async () => {
        await connection.query(`DELETE FROM users;`);
    })

    it("Returns 201 for valid params", async () => {
        const body = {
            name: "Test1",
            email: "test1@email.com",
            password: "1234"
        }
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(201);
    })

    it("Returns 409 for duplicated email", async () => {
        const body = {
            name: "Test1",
            email: "test1@email.com",
            password: "1234"
        }
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(409);
    })

    it("Returns 400 for missing name param", async () => {
        const body = {
            name: "",
            email: "test2@email.com",
            password: "1234"
        }
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(400);
    })

    it("Returns 400 for missing email param", async () => {
        const body = {
            name: "Test3",
            email: "",
            password: "1234"
        }
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(400);
    })

    it("Returns 400 for missing password param", async () => {
        const body = {
            name: "Test4",
            email: "test4@email.com",
            password: ""
        }
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(400);
    })

    it("Returns 400 for small password param", async () => {
        const body = {
            name: "Test5",
            email: "test5@email.com",
            password: "123"
        }
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(400);
    })
})