import supertest from "supertest";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import "../src/setup.js";
import app from "../src/app.js";
import connection from "../src/database.js";
import createUser from "./factories/userFactory.js";
import createEntry from "./factories/entryFactory.js";

const token = uuid();
const user = createUser();
const entry = createEntry();

beforeAll(async () => {
  const userId = await connection.query(
    "INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING id",
    [user.name, user.email, bcrypt.hashSync(user.password, 10)]
  );
  await connection.query(
    "INSERT INTO sessions (token, user_id) VALUES ($1, $2)",
    [token, userId.rows[0].id]
  );
});

afterAll(async () => {
  await connection.query("DELETE FROM entries");
  await connection.query("DELETE FROM sessions");
  await connection.query("DELETE FROM users");
  connection.end();
});

describe("POST /entries", () => {
  it("Returns 201 for valid request", async () => {
    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer ${token}`)
      .send(entry);
    expect(result.status).toEqual(201);
  });

  it("Returns 400 for missing value param", async () => {
    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer ${token}`)
    expect(result.status).toEqual(400);
  });

  it("Returns 400 for missing token", async () => {
    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer `)
      .send(entry);

    expect(result.status).toEqual(400);
  });

  it("Returns 401 for invalid token", async () => {
    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer ${uuid()}`)
      .send(entry);
    expect(result.status).toEqual(401);
  });
});

describe("GET /entries", () => {
  it("Returns 200 for valid request", async () => {
    const result = await supertest(app)
      .get("/entries")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });

  it("Returns 400 for missing token param", async () => {
    const result = await supertest(app)
      .get("/entries")
      .set("Authorization", `Bearer `);
    expect(result.status).toEqual(400);
  });

  it("Returns 401 for invalid token", async () => {
    const result = await supertest(app)
      .get("/entries")
      .set("Authorization", `Bearer ${uuid()}`);
    expect(result.status).toEqual(401);
  });
});

describe("GET /entries/total", () => {
  it("Returns correct value from valid request", async () => {
    const total = entry.income ? entry.value : entry.value * (-1);
    const result = await supertest(app)
      .get("/entries/total")
      .set("Authorization", `Bearer ${token}`);
    expect(result.body.total).toEqual(total);
  })

  it("Returns 400 for missing token param", async () => {
    const result = await supertest(app)
      .get("/entries/total")
      .set("Authorization", `Bearer `);
    expect(result.status).toEqual(400);
  });

  it("Returns 401 for invalid token", async () => {
    const result = await supertest(app)
      .get("/entries/total")
      .set("Authorization", `Bearer ${uuid()}`);
    expect(result.status).toEqual(401);
  });
})
