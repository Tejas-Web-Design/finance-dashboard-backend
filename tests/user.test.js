//tests/user.test.js
const request = require("supertest");
const app = require("../app");
const db = require("../config/db");

describe("User API", () => {
  it("should create user", async () => {

    const uniqueEmail = `test${Date.now()}@test.com`; 

    const res = await request(app).post("/api/users").send({
      name: "Test",
      email: uniqueEmail,
      password: "12345",
      role: "admin"
    });

    expect(res.statusCode).toBe(200);
  });
}); 