import "reflect-metadata";
import { DataSource } from "typeorm";
import { SchoolEntity } from "./entities/SchoolEntity";
import { UserEntity } from "./entities/UserEntity";
import { ProfileEntity } from "./entities/ProfilesEntity";
import { PeriodEntity } from "./entities/PeriodEntity";
import { StudentEntity } from "./entities/StudentEntity";
import { ClassStudentEntity } from "./entities/ClassStudentEntity";
import { ClassPeriodEntity } from "./entities/ClassPeriodEntity";
import { EnvironmentConfig } from "../config";
import { PaymentEntity } from "./entities/PaymentEntity";
import { DisciplineEntity } from "./entities/DisciplineEntity";
import { NotesEntity } from "./entities/NotesEntity";
import { AcademicCycleEntity } from "./entities/AcademicCycleEntity";
import { MediaEntity } from "./entities/MediaEntity";

const env = new EnvironmentConfig();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.SYNCHRONIZE,
  logging: env.LOGGING,
  entities: [
    SchoolEntity,
    UserEntity,
    ProfileEntity,
    PeriodEntity,
    StudentEntity,
    ClassStudentEntity,
    ClassPeriodEntity,
    PaymentEntity,
    DisciplineEntity,
    NotesEntity,
    AcademicCycleEntity,
    MediaEntity,
  ],
  migrations: [],
});
