import { StudentResponseDTO } from "../../../application/dtos/student.dto";
import { Student } from "../../../domain/entities/Student";
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
      entity.status,
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
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
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

    return entity;
  }

  static toResponse(
    student: StudentEntity,
    school: SchoolEntity,
    profile: ProfileEntity,
    period: PeriodEntity,
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
      name: student.name,
      matriculation: student.matriculation,
      dateBirth: student.dateBirth,
      status: student.status,
      nameMother: student.nameMother,
      nameFather: student.nameFather,
      phone: student.phone,
      classStudent: student.classStudentUuid,
      dateMatriculation: student.dateMatriculation,
      hasDiscount: student.hasDiscount,
      discount: student.discount,
      dayPayment: student.dayPayment,
      uuid: student.uuid,
      id: student.id,
    };

    return response;
  }

  static toDto(data: any): StudentResponseDTO {
    const response: StudentResponseDTO = {
      escola: {
        name: data.schoolName,
        uuid: data.schoolUuid,
      },
      periodo: {
        name: data.periodName,
        uuid: data.periodUuid,
      },
      profile: {
        name: data.profileName,
        uuid: data.profileUuid,
      },
      name: data.name,
      matriculation: data.matriculation,
      dateBirth: data.dateBirth,
      status: data.studentStatus,
      nameMother: data.nameMother,
      nameFather: data.nameFather,
      phone: data.phone,
      classStudent: data.classStudent,
      dateMatriculation: data.dateMatriculation,
      hasDiscount: data.hasDiscount,
      discount: data.discount,
      dayPayment: data.dayPayment,
      uuid: data.studentUuid,
      id: data.id ?? 0,
    };

    return response;
  }
}
