import { inject, injectable } from "tsyringe";
import { Employee } from "../../../domain/entities/Employee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { EmployeeDTO } from "../../dtos/employee.dto";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateEmployeeUseCase {
  constructor(
    @inject(ContainerEnum.EMPLOYEE_REPOSITORY)
    private readonly _repo: IEmployeeRepository,
  ) {}

  async execute(data: EmployeeDTO): Promise<Employee> {
    console.log(data);
    const created = await this._repo.create(data);

    logger.info({
      message: "Employee criado com sucesso",
      employeeId: created.uuid,
    });

    return created;
  }
}
