import "reflect-metadata";
import { DataSource } from "typeorm";
import { SchoolEntity } from "./entities/SchoolEntity";
import { UserEntity } from "./entities/UserEntity";
import { ProfileEntity } from "./entities/ProfilesEntity";
import { PeriodEntity } from "./entities/PeriodEntity";
import { StudentEntity } from "./entities/StudentEntity";
import { environmentConfigInstance } from "../../main/instances/environment.instance";
import { ClassStudentEntity } from "./entities/ClassStudentEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: environmentConfigInstance.DB_HOST,
  port: environmentConfigInstance.DB_PORT,
  username: environmentConfigInstance.DB_USERNAME,
  password: environmentConfigInstance.DB_PASSWORD,
  database: environmentConfigInstance.DB_NAME,
  synchronize: environmentConfigInstance.SYNCHRONIZE,
  logging: environmentConfigInstance.LOGGING,
  entities: [
    SchoolEntity,
    UserEntity,
    ProfileEntity,
    PeriodEntity,
    StudentEntity,
    ClassStudentEntity,
  ],
  migrations: [],
});
