const request = require("supertest");
const { createApp } = require("../../app");
const { AppDataSource } = require("../models/datasource");

describe("원티드 사전과제 유닛 테스트", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.query(
      `
      DELETE FROM posts WHERE posts.title = 'test'
      `
    )
    await AppDataSource.destroy();
  });

  test("SUCCESS: Load Post List", async () => {
    await request(app)
      .get("/post/list") 
      .expect(200) 
  });

  test("SUCCESS Load Detail Page", async () => {
    await request(app)
      .get("/post/detail") 
      .query({id: 1 }) 
      .expect(200)
  });

  test("FAILED: Load Detail Page", async () => {
    await request(app)
    .get("/post/detail") 
    .query({id: 999 }) 
    .expect(400)
    .expect({ message: "INVALID DATA INPUT" });
});

test("SUCCESS: Search Keyword", async () => {
  await request(app)
    .get("/post/list/search") 
    .query({keyword: "원티드" }) 
    .expect(200) 
});

test("FAIL: Search empty Keyword", async () => {
  await request(app)
  .get("/post/list/search")
  .query({keyword: "" }) 
  .expect(400) 
  .expect({ message: "검색어를 입력해주세요" });
});

test("SUCCESS: Search Keyword no answer", async () => {
  await request(app)
  .get("/post/list/search")
  .query({keyword: "awerrrw" }) 
  .expect(204)
});

  test("SUCCESS: Apply Post", async () => {
    await request(app)
      .post("/post/apply")
      .send({id: 1, userId: 1 }) 
      .expect(200)
      .expect({
        "message": "success apply",
        "post_id": 1,
        "user_id": 1
    })
  });

  test("FAIL: Apply Post not exists", async () => {
    await request(app)
      .post("/post/apply")
      .send({id: 100, userId: 1 }) 
      .expect(400)
      .expect({
        "message": "POST NOT EXISTS"
    })
  });

  test("SUCCESS: delete Apply Post ", async () => {
    await request(app)
      .post("/post/apply")
      .send({id: 1, userId: 1 }) 
      .expect(200)
      .expect({
        "message": "success delete apply",
        "post_id": 1,
        "user_id": 1
    })
  });

  test("SUCCESS: posting register", async () => {
    await request(app)
    .post("/post/register")
    .send({
        "title":"test",
        "name":"넥슨",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"환영합니다 넥슨과 함께 성장해요",
        "deadline":"2022-10-30"
    }) 
    .expect(200) 
    .expect({ message: "채용공고 등록에 성공하였습니다!" });
  });

  test("FAIL: posting register", async () => {
    await request(app)
    .post("/post/register")
    .send({
        "title":"test",
        "name":"",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"환영합니다 넥슨과 함께 성장해요",
        "deadline":"2022-10-30"
    }) 
    .expect(400) 
    .expect({ message: "빈칸 없이 모두 입력해주세요" });
  });

  test("SUCCESS: posting edit", async () => {
    await request(app)
    .put("/post")
    .send({
        "id":"15",
        "title":"수정테스트입니다.",
        "name":"넥슨",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"edit test",
        "deadline":"2022-10-30"
    }) 
    .expect(200) 
    .expect({ message: "edit success" });
  });

  test("FAIL: posting edit", async () => {
    await request(app)
    .put("/post")
    .send({
        "id":"126",
        "title":"수정테스트",
        "name":"넥슨",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"edit test",
        "deadline":"2022-10-30"
    }) 
    .expect(400) 
    .expect({ message: "POST NOT EXISTS" });
  });

  test("SUCCESS: post delete", async () => {
    await request(app)
      .delete("/post")
      .query({id: 62}) 
      .expect(204)
  });

  test("FAIL: post delete", async () => {
    await request(app)
      .delete("/post")
      .query({id: 3113}) 
      .expect(400)
      .expect({
        "message": "POST NOT EXISTS"
    })
  });
});