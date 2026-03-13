import "reflect-metadata";
import { DataSource } from "typeorm";
import { SchoolEntity } from "./entities/SchoolEntity";
import { UserEntity } from "./entities/UserEntity";
import { ProfileEntity } from "./entities/ProfilesEntity";
import { PeriodEntity } from "./entities/PeriodEntity";
import { StudentEntity } from "./entities/StudentEntity";
import { environmentConfig } from "../../main/instances";
import { ClassStudentEntity } from "./entities/ClassStudentEntity";
import { ClassPeriodEntity } from "./entities/ClassPeriodEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: environmentConfig.DB_HOST,
  port: environmentConfig.DB_PORT,
  username: environmentConfig.DB_USERNAME,
  password: environmentConfig.DB_PASSWORD,
  database: environmentConfig.DB_NAME,
  synchronize: environmentConfig.SYNCHRONIZE,
  logging: environmentConfig.LOGGING,
  entities: [
    SchoolEntity,
    UserEntity,
    ProfileEntity,
    PeriodEntity,
    StudentEntity,
    ClassStudentEntity,
    ClassPeriodEntity,
  ],
  migrations: [],
});
