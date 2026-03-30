import { SchoolDTO } from "../../../application/dtos/school.dto";
import { School } from "../../../domain/entities/School";
import { StatusEnum } from "../../../utils/enum/status";
import { replace } from "../../../utils/helpers/replace";
import { SchoolEntity } from "../entities/SchoolEntity";

export class SchoolMapper {
  static toDomain(entity: SchoolEntity | any): School {
    return new School(
      entity.name,
      entity.address,
      entity.phone,
      entity.email,
      entity.nameDirector,
      entity.cnpj,
      entity.status,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
      },
    );
  }

  static toEntity(data: School | SchoolDTO): SchoolEntity {
    const entity = new SchoolEntity();

    entity.name = data.name;
    entity.address = data.address;
    entity.phone = data.phone;
    entity.email = data.email;
    entity.nameDirector = data.nameDirector;
    entity.cnpj = replace(data.cnpj);
    entity.status = StatusEnum.ACTIVE;

    console.log(entity);

    return entity;
  }
}
