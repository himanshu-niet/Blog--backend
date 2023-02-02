const request = require("supertest");
const app = require("../index");



describe("Authentication  Endpoints", () => {

  it("should signup new user", async () => {
    const res = await request(app).post("/api/signup").send({
      name: "Himanshu",
      email: "h1qqww@g.com", // use unique Email id 
      phone: 12347890,
      password: "123456"
    });
    expect(res.statusCode).toEqual(201);
  });

    it("should signin existing user", async () => {
      const res = await request(app).post("/api/signin").send({
        email: "h@g.com",
        password: "123456",
      });
      expect(res.statusCode).toEqual(202);
      
    });
});






describe("Blog Endpoints for Logged In Users", () => {

     it("should get all blogs", async () => {
       const res = await request(app).get("/api/blog")
        
       expect(res.statusCode).toEqual(200);
     });

       it("should get blog by id", async () => {
         const res = await request(app)
           .get("/api/blog")
           .query({ id: "63db5b227782f0323cbc24a3" });

         expect(res.statusCode).toEqual(200);
       });


       it("should get all blog created by logged in user", async () => {
         const res = await request(app)
           .get("/api/blog/my")
           .set(
             "authorization",
             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiNDY5YzI2OWIyZjk0MzdjNzA4ZDYiLCJlbWFpbCI6ImhAZy5jb20iLCJpYXQiOjE2NzUzMTQ5MjIsImV4cCI6MTY3NjE3ODkyMn0.DyU17HjyiyHCao-uTX7Rpbi0vqzYMKBTO4twT3MGJGg"
           );
         expect(res.statusCode).toEqual(200);
       });

  it("should create a new blog", async () => {
    const res = await request(app)
      .post("/api/blog")
      .set(
        "authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiNDY5YzI2OWIyZjk0MzdjNzA4ZDYiLCJlbWFpbCI6ImhAZy5jb20iLCJpYXQiOjE2NzUzMTQ5MjIsImV4cCI6MTY3NjE3ODkyMn0.DyU17HjyiyHCao-uTX7Rpbi0vqzYMKBTO4twT3MGJGg"
      )
      .send({
        title: "HAVE A GOOD DAY",
        description: "Good Morning",
      });
    expect(res.statusCode).toEqual(201);
  });

    it("should update blog", async () => {
      const res = await request(app)
        .put("/api/blog")
        .set(
          "authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiNDY5YzI2OWIyZjk0MzdjNzA4ZDYiLCJlbWFpbCI6ImhAZy5jb20iLCJpYXQiOjE2NzUzMTQ5MjIsImV4cCI6MTY3NjE3ODkyMn0.DyU17HjyiyHCao-uTX7Rpbi0vqzYMKBTO4twT3MGJGg"
        )
        .query({ id: "63db6dc02f3d957810ea6050" })
        .send({
          description: "Good Night",
        });
      expect(res.statusCode).toEqual(200);
    });

    it("should delete blog", async () => {
      const res = await request(app)
        .delete("/api/blog")
        .set(
          "authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiNDY5YzI2OWIyZjk0MzdjNzA4ZDYiLCJlbWFpbCI6ImhAZy5jb20iLCJpYXQiOjE2NzUzMTQ5MjIsImV4cCI6MTY3NjE3ODkyMn0.DyU17HjyiyHCao-uTX7Rpbi0vqzYMKBTO4twT3MGJGg"
        )
        .query({ id: "63db6d6b2f3d957810ea604c" });
      expect(res.statusCode).toEqual(200);
    });
});





describe("Blog Endpoints for Logged Out Users", () => {

  it("should get all blogs", async () => {
    const res = await request(app).get("/api/blog");
    expect(res.statusCode).toEqual(200);
  });

  it("should get blog by id", async () => {
    const res = await request(app)
      .get("/api/blog")
      .query({ id: "63db5b227782f0323cbc24a3" });

    expect(res.statusCode).toEqual(200);
  });

  it("should get all blog created by logged in user", async () => {
    const res = await request(app)
      .get("/api/blog/my")
     
    expect(res.statusCode).toEqual(200);
  });

  it("should create a new blog", async () => {
    const res = await request(app)
      .post("/api/blog")
      
      .send({
        title: "HAVE A GOOD DAY",
        description: "Good Morning",
      });
    expect(res.statusCode).toEqual(201);
  });

  it("should update blog", async () => {
    const res = await request(app)
      .put("/api/blog")
     
      .query({ id: "63db6dc02f3d957810ea6050" })
      .send({
        description: "Good Night",
      });
    expect(res.statusCode).toEqual(200);
  });

  it("should delete blog", async () => {
    const res = await request(app)
      .delete("/api/blog")

      .query({ id: "63db6d4d7a412baff486b267" });
    expect(res.statusCode).toEqual(200);
  });
});



