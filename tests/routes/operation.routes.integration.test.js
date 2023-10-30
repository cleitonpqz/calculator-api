describe("Operation", () => {
  it("should fail to return a list of operations without an token", async () => {
    const res = await request(app).get("/api/v1/operations");
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual("No token provided!");
  });

  it("should return a list of operations", async () => {
    const user = {
      username: "test_list_operations@email.com",
      password: "12345678",
    };
    await request(app).post("/api/v1/auth/signup").send(user);
    const res1 = await request(app).post("/api/v1/auth/signin").send(user);

    const res2 = await request(app)
      .get("/api/v1/operations")
      .set("Authorization", `Bearer ${res1.body.accessToken}`);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.length).toEqual(6);
  });
});
