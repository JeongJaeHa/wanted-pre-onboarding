const request = require("supertest");
const { createApp } = require("../../app");
const { AppDataSource } = require("../models/datasource");

describe("원티드 사전과제 유닛 테스트 - application", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize();
        await AppDataSource.query(
            `INSERT INTO post 
                (title,
                corperation_id,
                position,
                skill,
                compensation,
                explanation,
                deadline)
            VALUES (
                "지원 테스트",
                "1",
                "백엔드",
                "Node.js",
                "300000",
                "안녕하세요 반갑습니다",
                "2022-10-12") 
            `)
    });

    afterAll(async () => {
        await AppDataSource.query(`DELETE FROM post WHERE title = "지원 테스트"`)
        await AppDataSource.query(`TRUNCATE applications`)
        await AppDataSource.destroy();
    });

    test("SUCCESS: Apply Post", async () => {
        await request(app)
            .post('/application')
            .send({id: 1, userId: 1})
            .expect(200)
            .expect({
                "message": "지원하셨습니다.",
                "post_id": 1,
                "user_id": 1
        })
    })

    test("FAIL: Apply Post not exists", async () => {
        await request(app)
            .post("/application")
            .send({id: 100, userId: 1 }) 
            .expect(400)
            .expect({"message": "POST NOT EXISTS", statusCode: 400})
    });

    test("FAIL:  Already Apply Post ", async () => {
        await request(app)
            .post("/application")
            .send({id: 1, userId: 1 }) 
            .expect(400)
            .expect({"message": "이미 지원한 채용공고 입니다.", statusCode: 400})
    });
});

describe("원티드 사전과제 유닛 테스트 - post", () => {
    let app;

    beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(
    `INSERT INTO post (
        title,
        corperation_id,
        position,
        skill,
        compensation,
        explanation,
        deadline)
    VALUES (
        "테스트 타이틀",
        "1",
        "백엔드",
        "Node.js",
        "300000",
        "안녕하세요 반갑습니다",
        "2022-10-12")
    `)
});

afterAll(async () => {
    await AppDataSource.query(`DELETE FROM post p WHERE p.title = "테스트 타이틀"`)
    await AppDataSource.query(`DELETE FROM post p WHERE p.title = "test"`)
    await AppDataSource.query(`TRUNCATE applications`)
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
    .expect({ message: "POST NOT EXISTS", statusCode: 400 });
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
    .expect({ message: "검색어를 입력해주세요", statusCode: 400 });
});

test("SUCCESS: Search Keyword no answer", async () => {
    await request(app)
    .get("/post/list/search")
    .query({keyword: "awerrrw" }) 
    .expect(204)
});

test("SUCCESS: posting register", async () => {
    await request(app)
    .post("/post/register")
    .send({
        "title":"test",
        "name":"원티드",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"환영합니다 배민과 함께 성장해요",
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
        "name":"테스트회사명",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"환영합니다 배민과 함께 성장해요",
        "deadline":"2022-10-30"
    }) 
    .expect(400) 
    .expect({ message: "회사를 등록해주세요", statusCode: 400 });
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
        "id":"1",
        "title":"수정테스트중",
        "name":"원티드",
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
        "name":"원티드",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"edit test",
        "deadline":"2022-10-30"
    }) 
    .expect(400) 
    .expect({ message: "POST NOT EXISTS", statusCode: 400});
});

test("FAIL: posting edit", async () => {
    await request(app)
    .put("/post")
    .send({
        "id":"1",
        "title":"수정테스트",
        "name":"주식회사",
        "position":"백엔드주니어",
        "skill":"Node.js",
        "compensation":"100000",
        "explanation":"edit test",
        "deadline":"2022-10-30"
    }) 
    .expect(400) 
    .expect({ message: "회사를 등록해주세요", statusCode: 400});
});

test("SUCCESS: post delete", async () => {
    await request(app)
    .delete("/post")
    .query({id: 1}) 
    .expect(204)
});

test("FAIL: post delete", async () => {
    await request(app)
    .delete("/post")
    .query({id: 3113}) 
    .expect(400)
    .expect({
        "message": "POST NOT EXISTS", statusCode: 400
    })
});
});