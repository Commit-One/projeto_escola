import { EmployeeDTO } from "../../../application/dtos/employee.dto";
import { Employee } from "../../../domain/entities/Employee";
import { EmployeeEntity } from "../entities/EmployeeEntity";

export class EmployeeMapper {
  static toDomain(entity: EmployeeEntity): Employee {
    return new Employee(entity.name, entity.email, entity.profileUuid, {
      createdAt: entity.createdAt,
      enable: entity.enable,
      uuid: entity.uuid,
    });
  }

  static toEntity(data: Employee | EmployeeDTO): EmployeeEntity {
    const entity = new EmployeeEntity();

    entity.name = data.name;
    entity.email = data.email;
    entity.profileUuid = data.profileUuid;

    return entity;
  }
}
