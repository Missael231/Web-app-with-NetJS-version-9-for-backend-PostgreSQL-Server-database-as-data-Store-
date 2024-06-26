import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/entities/role.entity";

describe("Roles E2E", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /roles", () => {
    return request(app.getHttpServer())
      .get("/roles")
      .expect(200)
      .expect(/^\[[\s\S]*?\]$/); // returns array
  });

  describe("POST /roles", () => {
    it("create a role if valid data is provided", () => {
      return request(app.getHttpServer())
        .post("/roles")
        .send({
          name: "CEO",
          description: "creates mission and purpose statements",
        })
        .expect(201)
        .expect(/CEO/);
    });

    it("returns 400 if invalid name(e.g. if not provided) is provided", () => {
      return request(app.getHttpServer())
        .post("/roles")
        .send({
          description: "creates mission and purpose statements",
        })
        .expect(400)
        .expect(/name/)
        .expect(/error/);
    });

    it("returns 400 if invalid description(e.g. if it is not string) is provided", () => {
      return request(app.getHttpServer())
        .post("/roles")
        .send({
          name: "CEO",
          description: 343534,
        })
        .expect(400)
        .expect(/description/)
        .expect(/error/);
    });

    it("returns 400 if invalid parentId(e.g. if it is not a number) is provided", () => {
      return request(app.getHttpServer())
        .post("/roles")
        .send({
          name: "CTO",
          description:
            "manages the physical and personnel technology infrastructure",
          parentId: "xdd3",
        })
        .expect(400)
        .expect(/parentId/)
        .expect(/error/);
    });
  });

  describe("With some role data", () => {
    let cto: Role, ceo: Role, frontend: Role;
    beforeAll(async () => {
      const rolesService = app.get(RolesService);
      ceo = await rolesService.create({
        name: "CEO",
      });
      cto = await rolesService.create({
        name: "CTO",
        parentId: ceo.id,
      });
      await rolesService.create({
        name: "Backend Developer",
        parentId: cto.id,
      });
      frontend = await rolesService.create({
        name: "Frontend Developer",
        parentId: cto.id,
      });
    });

    describe("GET /roles/:id", () => {
      it("for existing role should return 200", async () => {
        return request(app.getHttpServer())
          .get(`/roles/${cto.id}`)
          .expect(200)
          .expect(/CTO/)
          .expect(/^\{[\s\S]*?\}$/); // returns array
      });

      it("for non-existing role should return 404", async () => {
        return request(app.getHttpServer())
          .get(`/roles/bc248988-2b89-426b-a1cc-616575d23fad`)
          .expect(404)
          .expect(/error/)
          .expect(/Not Found/);
      });
    });

    describe("PATCH /roles/:id", () => {
      it("should update a role if it exists and valid data is provided", () => {
        return request(app.getHttpServer())
          .patch(`/roles/${cto.id}`)
          .send({
            description:
              "manages the physical and personnel technology infrastructure",
          })
          .expect(200)
          .expect(/technology infrastructure/);
      });

      it("should return 404 if the role doesn't exist", () => {
        return request(app.getHttpServer())
          .patch("/roles/bc248988-2b89-426b-a1cc-616575d23fa1")
          .expect(404)
          .expect(/Not Found/);
      });

      it("should return 400 if the id isn't valid UUID", () => {
        return request(app.getHttpServer())
          .patch("/roles/3535")
          .expect(400)
          .expect(/Bad Request/);
      });

      it("should return 400 if the body isn't valid", () => {
        return request(app.getHttpServer())
          .patch(`/roles/${cto.id}`)
          .send({ description: 43343 }) 
          .expect(400)
          .expect(/Bad Request/);
      });
    });

    describe("DELETE /roles/:id", () => {
      it("should return 204", () => {
        return request(app.getHttpServer())
          .delete(`/roles/${frontend.id}`)
          .expect(204);
      });

      it("should return forbidden if the role has children", async () => {
        await request(app.getHttpServer())
          .delete(`/roles/${cto.id}`)
          .expect(403);
      });

      it("should return 400 if the id isn't valid UUID", () => {
        return request(app.getHttpServer())
          .delete("/roles/xxxddd777")
          .expect(400)
          .expect(/Bad Request/);
      });
    });
  });
});
