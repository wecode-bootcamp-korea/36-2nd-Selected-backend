const request = require("supertest");
const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("get job list", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized");
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
                database.destroy()
            })
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    test("FAILED: limit KEY_ERROR", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 10 })
            .expect(400)
            .expect({ message: "KEY_ERROR" })
    });

    test("FAILED: offset KEY_ERROR", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ limit: 10 })
            .expect(400)
            .expect({ message: "KEY_ERROR" })
    });

    test("FAILED: WRONT INPUT", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ limit: "wrong type", offset: 10 })
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: WRONT INPUT", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ limit: "wrong type", offset: 10 })
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: WRONT INPUT", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ limit: 10, offset: "wrong type" })
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: WRONT INPUT", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ limit: "wrong type", offset: "wrong type" })
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: NO DATA", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ limit: 8, offset: 200 })
            .expect(409)
            .expect({ message: "NO_DATA" })
    });

    test("FAILED: NO TAG DATAS", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 500, limit: 8, jobTags: 3 })
            .expect(409)
            .expect({ message: "NO_DATA" })
    });

    test("FAILED: NO (TAG & CATEGORY) DATAS", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 500, limit: 8, jobTags: 3, jobSort: 3 })
            .expect(409)
            .expect({ message: "NO_DATA" })
    });

    test("FAILED: TAG TYPE ERROR", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 0, limit: 8, jobTags: "a" })
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: NO CATEGORY DATAS", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 500, limit: 8, jobSort: 3 })
            .expect(409)
            .expect({ message: "NO_DATA" })
    });

    test("FAILED: CATEGORY TYPE ERROR", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 0, limit: 8, jobSort: "a" })
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("SUCCESS: GET JOBS", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 10, limit: 8 })
            .expect(200)
    });

    test("SUCCESS: GET JOBS BY CATEGORY", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 0, limit: 8, jobSort: 2 })
            .expect(200)
    });

    test("SUCCESS: GET JOBS BY TAGS", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 0, limit: 8, jobTags: 4 })
            .expect(200)
    });

    test("SUCCESS: GET JOBS BY TAGS & CATEGORY", async () => {
        await request(app)
            .get("/jobs/list")
            .query({ offset: 0, limit: 8, jobTags: 6, jobSort: 3 })
            .expect(200)
    });
});