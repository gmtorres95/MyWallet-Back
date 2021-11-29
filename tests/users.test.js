import supertest from "supertest";
import "../src/setup.js";
import app from "../src/app.js";
import connection from "../src/database.js";
import createUser from "./factories/userFactory.js";

const user = createUser();
const invalidUser = createUser();

afterAll(async () => {
	await connection.query("DELETE FROM sessions");
	await connection.query("DELETE FROM users");
	connection.end();
});

describe("POST /sign-up", () => {
  it("Returns 201 for valid params", async () => {
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.status).toEqual(201);
  });

  it("Returns 409 for duplicated email", async () => {
    const result = await supertest(app).post("/sign-up").send(user);
    expect(result.status).toEqual(409);
  });

  it("Returns 400 for missing name params", async () => {
    const result = await supertest(app).post("/sign-up");
    expect(result.status).toEqual(400);
  });
});

describe("POST /sign-in", () => {
  it("Returns 200 for valid params", async () => {
    const result = await supertest(app).post("/sign-in").send(user);
    expect(result.status).toEqual(200);
  });

  it("Returns 401 for invalid email or password", async () => {
    const result = await supertest(app).post("/sign-in").send(invalidUser);
    expect(result.status).toEqual(401);
  });

	it("Returns 400 for invalid params", async () => {
    const result = await supertest(app).post("/sign-in");
    expect(result.status).toEqual(400);
  });
});
