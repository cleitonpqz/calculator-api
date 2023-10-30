describe("Auth Sign Up", () => {
  const payload = {
    username: "test@gmail.com",
    password: "12345678",
  };
  it("should register a new user", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send(payload);
    expect(res.statusCode).toEqual(201);
  });

  it("should fail for an user already registered", async () => {
    const payloadDuplicated = {
      username: "test_duplicate@gmail.com",
      password: "12345678",
    };
    await request(app).post("/api/v1/auth/signup").send(payloadDuplicated);
    const failed = await request(app)
      .post("/api/v1/auth/signup")
      .send(payloadDuplicated);
    expect(failed.statusCode).toEqual(400);
    expect(failed.body.message).toEqual("Failed! Username is already in use.");
  });

  it("should fail for a min lenght password", async () => {
    payload.password = "1234567";
    const res = await request(app).post("/api/v1/auth/signup").send(payload);
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0]).toEqual("Invalid length for field password");
  });

  it("should fail for missing username or password", async () => {
    payload.username = "";
    payload.password = "";
    const res = await request(app).post("/api/v1/auth/signup").send(payload);
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0]).toEqual("Invalid email for field username");
    expect(res.body.errors[1]).toEqual("Invalid length for field password");
  });
});

describe("Auth Signin", () => {
  const payload = {
    username: "test_signin@gmail.com",
    password: "12345678",
  };
  it("should signin successfully", async () => {
    await request(app).post("/api/v1/auth/signup").send(payload);
    const res = await request(app).post("/api/v1/auth/signin").send(payload);
    expect(res.statusCode).toEqual(200);
  });

  it("should fail with invalid password", async () => {
    payload.password = "123456789";
    const res = await request(app).post("/api/v1/auth/signin").send(payload);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Invalid Password!");
  });

  it("should fail with not found user", async () => {
    payload.username = "test_not_found@email.com";
    const res = await request(app).post("/api/v1/auth/signin").send(payload);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("User not found");
  });
});

// let server;
// let container;
// beforeAll(async () => {
//   container = await new MySqlContainer()
//     .withUsername("test")
//     .withUserPassword("test")
//     .withDatabase("test_api")
//     .start();

//   process.env.DB_PORT = container.getPort();
//   const knexTestConfig = require("../../knexfile")["test"];
//   knexTestSetup = require("knex")(knexTestConfig);
//   await knexTestSetup.migrate.latest();

//   // jest.mock("../../middlewares", () => {
//   //   return {
//   //     dataValidation: {
//   //       validateUserBody: (req, res, next) => next(),
//   //     },
//   //     verifySignUp: {
//   //       checkDuplicateUsername: (req, res, next) => next(),
//   //     },
//   //     authJWT: {
//   //       verifyToken: (req, res, next) => next(),
//   //     },
//   //   };
//   // });
