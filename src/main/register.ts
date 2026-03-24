import { container } from "tsyringe";
import { LoginTypeOrmRepository } from "../infrastructure/database/repositories/login.repository";
import { AuthenticationSecurity } from "../infrastructure/security/auth";
import { BcryptSecurity } from "../infrastructure/security/bcrypt";
import { ContainerEnum } from "../utils/enum/container";
import { ClassPeriodTypeOrmRepository } from "../infrastructure/database/repositories/classPeriod.repository";
import { RedisService } from "../infrastructure/redis/redis.service";
import { ClassStudentTypeOrmRepository } from "../infrastructure/database/repositories/classStudent.repository";
import { PaymentTypeOrmRepository } from "../infrastructure/database/repositories/payment.repository";
import { PeriodTypeOrmRepository } from "../infrastructure/database/repositories/period.repository";
import { ProfileTypeOrmRepository } from "../infrastructure/database/repositories/profile.repository";
import { SchoolTypeOrmRepository } from "../infrastructure/database/repositories/school.repository";
import { StudentTypeOrmRepository } from "../infrastructure/database/repositories/student.repository";
import { UserTypeOrmRepository } from "../infrastructure/database/repositories/user.repository";
import { RabbitService } from "../infrastructure/messaging/rabbit/rabbit.service";
import { EnvironmentConfig } from "../infrastructure/config";
import { DisciplineTypeOrmRepository } from "../infrastructure/database/repositories/discipline.repository";
import { StudentDisciplineTypeOrmRepository } from "../infrastructure/database/repositories/studentDiscipline.repository";

export const environment = new EnvironmentConfig();

container.registerSingleton(
  ContainerEnum.LOGIN_REPOSITORY,
  LoginTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.AUTHENTICATION_SECURITY,
  AuthenticationSecurity,
);
container.registerSingleton(ContainerEnum.BCRYPT_SECURITY, BcryptSecurity);
container.registerSingleton(
  ContainerEnum.CLASS_PERIOD_REPOSITORY,
  ClassPeriodTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.DISCIPLINE_REPOSITORY,
  DisciplineTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.STUDENT_DISCIPLINE_REPOSITORY,
  StudentDisciplineTypeOrmRepository,
);
container.registerSingleton(ContainerEnum.REDIS_SERVICE, RedisService);
container.registerSingleton(
  ContainerEnum.CLASS_STUDENT_REPOSITORY,
  ClassStudentTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.PAYMENT_REPOSITORY,
  PaymentTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.PERIOD_REPOSITORY,
  PeriodTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.PROFILE_REPOSITORY,
  ProfileTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.SCHOOL_REPOSITORY,
  SchoolTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.STUDENT_REPOSITORY,
  StudentTypeOrmRepository,
);
container.registerSingleton(
  ContainerEnum.USER_REPOSITORY,
  UserTypeOrmRepository,
);
container.registerSingleton(ContainerEnum.QUEUE_SERVICE, RabbitService);
