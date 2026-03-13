import { ClassStudentDTO } from "../../../application/dtos/classStudent.dto";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";

export class ClassStudentMapper {
  static toDomain(entity: ClassStudentEntity): ClassStudent {
    return new ClassStudent(entity.name, entity.maxAge, entity.minAge, {
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      enable: entity.enable,
    });
  }

  static toEntity(data: ClassStudent | ClassStudentDTO): ClassStudentEntity {
    const entity = new ClassStudentEntity();

    entity.name = data.name;
    entity.maxAge = data.maxAge;
    entity.minAge = data.minAge;
    entity.createdAt = new Date();
    entity.uuid = crypto.randomUUID();

    return entity;
  }
}
