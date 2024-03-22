import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { RolesService } from "src/roles/roles.service";
import { departmentsService } from "src/departments/departments.service";
import { Gender } from "src/departments/entities/department.entity";

describe("Roles E2E", () => {
  let app: INestApplication;
  let rolesService: RolesService;
  let departmentsService: departmentsService;

  const random = Math.floor(Math.random() * 1000);
  const department = {
    fullName: "Abebe Tesfu",
    email: random + "abebe123@perago.com",
    phone: "0987334" + random,
    gender: Gender.Male,
    birthDate: new Date("2000-03-05T11:51:06.753Z"),
    hireDate: new Date("2020-07-05T11:51:06.753Z"),
    photo: "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
    rolesService = app.get(RolesService);
    departmentsService = app.get(departmentsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /departments", () => {
    return request(app.getHttpServer())
      .get("/departments")
      .expect(200)
      .expect(/page/)
      .expect(/limit/)
      .expect(/result/)
      .expect(/^\{[\s\S]*?\}$/); // returns array
  });

  describe("POST /departments", () => {
    it("create a department if valid data is provided", async () => {
      const role = await rolesService.create({
        name: "CEO",
      });

      return request(app.getHttpServer())
        .post("/departments")
        .send({ ...department, roleId: role.id })
        .expect(201)
        .expect(/Abebe Tesfu/);
    });
  });
});
