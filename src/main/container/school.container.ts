import { CreateSchoolUseCase } from "../../application/use-cases/school/CreateSchoolUseCase";
import { DeleteSchoolUseCase } from "../../application/use-cases/school/DeleteSchoolUseCase";
import { GetAllSchoolUseCase } from "../../application/use-cases/school/GetAllSchoolUseCase";
import { GetSchoolByNameUseCase } from "../../application/use-cases/school/GetSchoolByNameUseCase";
import { UpdateSchoolUseCase } from "../../application/use-cases/school/UpdateSchoolUseCase";
import { UpdateStatusSchoolUseCase } from "../../application/use-cases/school/UpdateStatusSchoolUseCase";
import { SchoolTypeOrmRepository } from "../../infrastructure/database/repositories/SchoolRepository";
import { SchoolController } from "../../infrastructure/http/controllers/SchoolController";
import { cacheInstance, rabbitServiceInstance } from "../instances";

export const makeSchoolContainer = () => {
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
};
