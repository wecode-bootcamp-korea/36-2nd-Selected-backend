const axios = require("axios");
const request = require("supertest");
const { createApp } = require("../app");
const { AppDataSource } = require("../src/models/dataSource");

describe("Log In", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
        database.destroy();
      });
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test("SUCCESS: kakao login", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1234123412,
        // kakao_account: {
        //   profile: {
        //     nickname: "김블핑",
        //   },
        //   email: "blackpink@email.com",
        // },
      },
    });

    await request(app)
      .post("/auths/kakao-login")
      .set({
        Authorization: "kakaoToken",
      })
      // .send({ access_token: "1234123412" })
      .expect(200);
  });

  test("FAILED: invalid kakao token", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1234123412,
        // kakao_account: {
        //   profile: {
        //     nickname: "김블핑",
        //   },
        //   email: "blackpink@email.com",
        // },
      },
    })

    await request(app)
      .post("/auths/kakao-login")
      .expect(400, {message: "INVALID_TOKEN"});
  });
});
