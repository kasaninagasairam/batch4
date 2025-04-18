const request = require("supertest");
const app = require("../src/app");
 
describe("User Routes", () => {
 
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "John Doe", email: "john@example.com", age: 30 });
 
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("name", "John Doe");
    expect(response.body.data).toHaveProperty("email", "john@example.com");
    expect(response.body.data).toHaveProperty("age", 30);
  });
 
 
});
 