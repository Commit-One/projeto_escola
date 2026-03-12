import { School } from "../../../domain/entities/School";
import { SchoolEntity } from "../entities/SchoolEntity";

export class SchoolMapper {
    static toDomain(entity: SchoolEntity): School {
        return new School(
            entity.name, entity.address, entity.phone, entity.email, entity.nameDirector, entity.status
        );
    }
}