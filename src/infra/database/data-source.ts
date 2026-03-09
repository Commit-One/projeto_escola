import "reflect-metadata";
import { DataSource } from "typeorm";
import { SchoolEntity } from "./entities/SchoolEntity";
import { EnvironmentConfig } from "../config";
import { UserEntity } from "./entities/UserEntity";
import { ProfileEntity } from "./entities/ProfilesEntity";
import { PeriodEntity } from "./entities/PeriodEntity";
import { StudentEntity } from "./entities/StudentEntity";

const config = new EnvironmentConfig();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: config.SYNCHRONIZE,
  logging: config.LOGGING,
  entities: [
    SchoolEntity,
    UserEntity,
    ProfileEntity,
    PeriodEntity,
    StudentEntity,
  ],
  migrations: [],
});
