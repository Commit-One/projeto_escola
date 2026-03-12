import { CreateSchoolUseCase } from "../../application/use-cases/school/create.usecase";
import { DeleteSchoolUseCase } from "../../application/use-cases/school/delete.usecase";
import { GetAllSchoolUseCase } from "../../application/use-cases/school/getAll.usecase";
import { GetSchoolByNameUseCase } from "../../application/use-cases/school/getByName.usecase";
import { UpdateSchoolUseCase } from "../../application/use-cases/school/update.usecase";
import { UpdateStatusSchoolUseCase } from "../../application/use-cases/school/updateStatus.usecase";
import { SchoolTypeOrmRepository } from "../../infrastructure/database/repositories/SchoolRepository";
import { SchoolController } from "../../infrastructure/http/controllers/school.controller";
import { cacheInstance, rabbitServiceInstance } from "../instances";

export class MakeSchoolContainer {
  public static inicialize() {
    const repo = new SchoolTypeOrmRepository();

    const createUC = new CreateSchoolUseCase(repo, cacheInstance, rabbitServiceInstance);
    const getAllUC = new GetAllSchoolUseCase(repo, cacheInstance);
    const deleteUC = new DeleteSchoolUseCase(repo, cacheInstance);
    const updateUC = new UpdateSchoolUseCase(repo, cacheInstance);
    const updateStatusUC = new UpdateStatusSchoolUseCase(repo, cacheInstance);
    const getByNameUC = new GetSchoolByNameUseCase(repo, cacheInstance);
    const controller = new SchoolController(
      createUC,
      getAllUC,
      deleteUC,
      updateUC,
      getByNameUC,
      updateStatusUC,
    );

    return controller;
  }
}