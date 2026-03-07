import { CreateSchoolUseCase } from "../../application/use-cases/school/CreateSchoolUseCase";
import { DeleteSchoolUseCase } from "../../application/use-cases/school/DeleteSchoolUseCase";
import { GetAllSchoolUseCase } from "../../application/use-cases/school/GetAllSchoolUseCase";
import { GetSchoolByNameUseCase } from "../../application/use-cases/school/GetSchoolByNameUseCase";
import { UpdateSchoolUseCase } from "../../application/use-cases/school/UpdateSchoolUseCase";
import { SchoolTypeOrmRepository } from "../../infra/database/repositories/SchoolRepository";
import { SchoolController } from "../../infra/http/controllers/SchoolController";

export const makeSchoolContainer = () => {
  const repo = new SchoolTypeOrmRepository();
  const createUC = new CreateSchoolUseCase(repo);
  const getAllUC = new GetAllSchoolUseCase(repo);
  const deleteUC = new DeleteSchoolUseCase(repo);
  const updateUC = new UpdateSchoolUseCase(repo);
  const getByNameUC = new GetSchoolByNameUseCase(repo);
  const controller = new SchoolController(
    createUC,
    getAllUC,
    deleteUC,
    updateUC,
    getByNameUC,
  );

  return controller;
};
