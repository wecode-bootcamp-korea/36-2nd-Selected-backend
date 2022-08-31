const request = require("supertest");

const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("get job details", () => {
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

    test("FAILED: jobId TYPE_ERROR", async () => {
        await request(app)
            .get("/jobs/details/y")
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: jobId TYPE_ERROR", async () => {
        await request(app)
            .get("/jobs/details/y")
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("FAILED: jobId TYPE_ERROR", async () => {
        await request(app)
            .get("/jobs/details")
            .expect(404)
    });

    test("FAILED: jobId NOT_EXIST", async () => {
        await request(app)
            .get("/jobs/details/999")
            .expect(409)
            .expect({ message: "INVALID_DATA" })
    });

    test("SUCCESS: GET JOB DETAILS", async () => {
        await request(app)
            .get("/jobs/details/1")
            .expect(200)
    });

})