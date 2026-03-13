import {
  StudentResponseDTO,
  StudentQuery,
} from "../../../application/dtos/student.dto";
import { Student } from "../../../domain/entities/Student";
import { StatusEnum } from "../../../utils/enum/status";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";
import { PeriodEntity } from "../entities/PeriodEntity";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { SchoolEntity } from "../entities/SchoolEntity";
import { StudentEntity } from "../entities/StudentEntity";

export class StudentMapper {
  static toDomain(entity: StudentEntity | any): Student {
    return new Student(
      entity.schoolUuid,
      entity.matriculation,
      entity.dateBirth,
      StatusEnum.ACTIVE,
      entity.nameMother,
      entity.nameFather,
      entity.name,
      entity.phone,
      entity.classStudentUuid,
      entity.periodUuid,
      entity.dateMatriculation,
      entity.hasDiscount,
      entity.discount,
      entity.dayPayment,
      entity.profileUuid,
      entity.cpf,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
        id: entity.id,
      },
    );
  }

  static toEntity(domain: Student): StudentEntity {
    const entity = new StudentEntity();

    entity.schoolUuid = domain.schoolUuid;
    entity.profileUuid = domain.profileUuid;
    entity.phone = domain.phone;
    entity.periodUuid = domain.periodUuid;
    entity.nameMother = domain.nameMother;
    entity.nameFather = domain.nameFather;
    entity.hasDiscount = domain.hasDiscount;
    entity.matriculation = domain.matriculation;
    entity.discount = domain.discount;
    entity.dayPayment = domain.dayPayment;
    entity.dateMatriculation = domain.dateMatriculation;
    entity.name = domain.name;
    entity.classStudentUuid = domain.classStudentUuid;
    entity.dateBirth = domain.dateBirth;
    entity.createdAt = new Date();
    entity.uuid = crypto.randomUUID();
    entity.cpf = domain.cpf;

    return entity;
  }

  static toResponse(
    student: StudentEntity | Student,
    school: SchoolEntity,
    profile: ProfileEntity,
    period: PeriodEntity,
    classStudent: ClassStudentEntity,
  ): StudentResponseDTO {
    const response: StudentResponseDTO = {
      escola: {
        name: school.name,
        uuid: school.uuid,
      },
      periodo: {
        name: period.name,
        uuid: period.uuid,
      },
      profile: {
        name: profile.name,
        uuid: profile.uuid,
      },
      class: {
        name: classStudent.name,
        uuid: classStudent.uuid,
      },
      name: student.name,
      matriculation: student.matriculation,
      dateBirth: student.dateBirth,
      status: student.status as StatusEnum,
      nameMother: student.nameMother,
      nameFather: student.nameFather,
      phone: student.phone,
      classStudentUuid: student.classStudentUuid,
      dateMatriculation: student.dateMatriculation,
      hasDiscount: student.hasDiscount,
      discount: student.discount,
      dayPayment: student.dayPayment,
      uuid: student.uuid,
      cpf: student.cpf,
    };

    return response;
  }

  static toQuery(dataJoin: StudentQuery): StudentResponseDTO {
    const response: StudentResponseDTO = {
      escola: {
        name: dataJoin.schoolName,
        uuid: dataJoin.schoolUuid,
      },
      periodo: {
        name: dataJoin.periodName,
        uuid: dataJoin.periodUuid,
      },
      profile: {
        name: dataJoin.profileName,
        uuid: dataJoin.profileUuid,
      },
      class: {
        name: dataJoin.className,
        uuid: dataJoin.classUuid,
      },
      name: dataJoin.name,
      matriculation: dataJoin.matriculation,
      dateBirth: dataJoin.dateBirth,
      status: dataJoin.status as StatusEnum,
      nameMother: dataJoin.nameMother,
      nameFather: dataJoin.nameFather,
      phone: dataJoin.phone,
      classStudentUuid: dataJoin.classStudentUuid,
      dateMatriculation: dataJoin.dateMatriculation,
      hasDiscount: dataJoin.hasDiscount,
      discount: dataJoin.discount,
      dayPayment: dataJoin.dayPayment,
      uuid: dataJoin.uuid,
      cpf: dataJoin.cpf,
    };

    return response;
  }
}
