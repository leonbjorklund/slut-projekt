// import argon2 from 'argon2';
import bcrypt from "bcrypt";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import { UserModel } from "../src/models/user-model";
import { MockDB, mockDB } from "./mock";

describe("Registering a user (POST)", () => {
  let db: MockDB;

  beforeEach(async () => {
    db = await mockDB();
  });

  it(
    "should be possible to register a user (200)",
    async () => {
      const response = await request(app)
        .post("/api/users/create")
        .set("content-type", "application/json")
        .send({ email: "new-user@plugga.se", password: "123123" });

      // Assert response is correct
      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body._id).toBeDefined();
      expect(response.body.email).toBe("new-user@plugga.se");
      expect(response.body.password).toBeUndefined();
      expect(response.body.isAdmin).toBe(false);
    },
    { timeout: 20000 }
  );

  it(
    "should not be possible to register a user with an existsing email (409)",
    async () => {
      const response = await request(app)
        .post("/api/users/create")
        .set("content-type", "application/json")
        .send({ email: "user@plugga.se", password: "123123" });

      // Assert response is correct
      expect(response.status).toBe(409);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(typeof response.body).toBe("string");
    },
    { timeout: 20000 }
  );

  it(
    "should not be possible to register a user with incorrect or missing values (400)",
    async () => {
      const user = { email: "new-user@plugga.se", password: "123123" };

      // Incorrect values
      for (const key of Object.keys(user)) {
        const faultyUser = { ...user, [key]: false };

        const response = await request(app)
          .post("/api/users/create")
          .set("content-type", "application/json")
          .send(faultyUser);

        // Assert response is correct
        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toMatch(new RegExp(`${key}`, "i"));
      }

      // Missing values
      for (const key of Object.keys(user)) {
        const faultyUser: any = { ...user };
        delete faultyUser[key];

        const response = await request(app)
          .post("/api/users/create")
          .set("content-type", "application/json")
          .send(faultyUser);

        // Assert response is correct
        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toMatch(new RegExp(`${key}`, "i"));
      }
    },
    { timeout: 20000 }
  );

  it(
    "should encrypt users password with salt when registering a new user",
    async () => {
      await request(app)
        .post("/api/users/create")
        .set("content-type", "application/json")
        .send({ email: "user1@plugga.se", password: "s3cr3t" });
      await request(app)
        .post("/api/users/create")
        .set("content-type", "application/json")
        .send({ email: "user2@plugga.se", password: "s3cr3t" });

      const user1 = await UserModel.findOne({
        email: "user1@plugga.se",
      }).select("+password");
      // const argon2Match =
      //   user1 && (await argon2.verify(user1.password, 's3cr3t'));
      const bcryptMatch =
        user1 && (await bcrypt.compare("s3cr3t", user1.password));
      expect(bcryptMatch).to.be.true;

      const user2 = await UserModel.findOne({
        email: "user2@plugga.se",
      }).select("+password");
      expect(user2?.password).not.toEqual(user1?.password);
    },
    { timeout: 20000 }
  );
});
