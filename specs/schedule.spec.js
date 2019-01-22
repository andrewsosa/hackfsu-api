/* eslint-env jest */

const micro = require("micro");
const request = require("supertest");
const router = require("../router");

const server = micro(router);

describe("/api/schedule", () => {
  it("responds to GET requests", done => {
    request(server)
      .get("/api/schedule")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
