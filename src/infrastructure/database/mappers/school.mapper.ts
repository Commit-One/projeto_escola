import { School } from "../../../domain/entities/School";
import { SchoolEntity } from "../entities/SchoolEntity";

export class SchoolMapper {
  static toDomain(entity: SchoolEntity | any): School {
    return new School(
      entity.name,
      entity.address,
      entity.phone,
      entity.email,
      entity.nameDirector,
      entity.status,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
      },
    );
  }
}
