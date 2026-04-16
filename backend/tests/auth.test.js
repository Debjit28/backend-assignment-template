const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Student = require("../src/models/Student");

const TEST_DB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/waygood-test";

beforeAll(async () => {
  await mongoose.connect(TEST_DB_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Student.deleteMany({});
});

describe("POST /api/auth/register", () => {
  it("should register a new user and return a token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      fullName: "Test Student",
      email: "test@example.com",
      password: "SecurePass123!",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe("test@example.com");
    expect(res.body.data.user.fullName).toBe("Test Student");
    expect(res.body.data.user.role).toBe("student");
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 409 for duplicate email registration", async () => {
    await request(app).post("/api/auth/register").send({
      fullName: "First User",
      email: "dupe@example.com",
      password: "SecurePass123!",
    });

    const res = await request(app).post("/api/auth/register").send({
      fullName: "Second User",
      email: "dupe@example.com",
      password: "AnotherPass456!",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      fullName: "Login Test",
      email: "login@example.com",
      password: "SecurePass123!",
    });
  });

  it("should login with valid credentials and return a token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "SecurePass123!",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe("login@example.com");
  });

  it("should return 401 for wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "WrongPassword!",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 for non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "noone@example.com",
      password: "Whatever123!",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

describe("GET /api/auth/me", () => {
  it("should return user profile with valid token", async () => {
    const registerRes = await request(app).post("/api/auth/register").send({
      fullName: "Profile User",
      email: "profile@example.com",
      password: "SecurePass123!",
    });

    const token = registerRes.body.data.token;

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("profile@example.com");
    // Password should be excluded
    expect(res.body.data.password).toBeUndefined();
  });

  it("should return 401 without a token", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
