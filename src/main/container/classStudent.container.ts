import { CreateClassStudentuUseCase } from "../../application/use-cases/classStudent/CreateClassStudentUseCase";
import { DeleteClassStudentUseCase } from "../../application/use-cases/classStudent/DeleteClassStudentUseCase";
import { GetAllClassStudentUseCase } from "../../application/use-cases/classStudent/GetAllClassStudentUseCase";
import { GetOneClassStudentUseCase } from "../../application/use-cases/classStudent/GetOneClassStudentUseCase";
import { UpdateClassStudentUseCase } from "../../application/use-cases/classStudent/UpdateClassStudentUseCase";
import { ClassStudentTypeOrmRepository } from "../../infra/database/repositories/ClassStudentRepository";
import { ClassStudentController } from "../../infra/http/controllers/ClassStudentController";
import { cacheInstance } from "../instances/cache.instance";

export const makeClassStudentContainer = () => {
  const repo = new ClassStudentTypeOrmRepository();  

  const createUC = new CreateClassStudentuUseCase(repo, cacheInstance);
  const deleteUC = new DeleteClassStudentUseCase(repo, cacheInstance);
  const getAllUC = new GetAllClassStudentUseCase(repo, cacheInstance);
  const getOneUC = new GetOneClassStudentUseCase(repo, cacheInstance);
  const updateUC = new UpdateClassStudentUseCase(repo, cacheInstance);

  const controller = new ClassStudentController(
    createUC,
    getAllUC,
    getOneUC,
    updateUC,
    deleteUC,
  );

  return controller;
};
