import { CreateClassStudentuUseCase } from "../../application/use-cases/classStudent/create.usecase";
import { DeleteClassStudentUseCase } from "../../application/use-cases/classStudent/delete.usecase";
import { GetAllClassStudentUseCase } from "../../application/use-cases/classStudent/getAll.usecase";
import { GetOneClassStudentUseCase } from "../../application/use-cases/classStudent/getOne.usecase";
import { UpdateClassStudentUseCase } from "../../application/use-cases/classStudent/update.usecase";
import { ClassStudentTypeOrmRepository } from "../../infrastructure/database/repositories/ClassStudentRepository";
import { ClassStudentController } from "../../infrastructure/http/controllers/classStudent.controller";
import { cacheInstance } from "../instances";

export class MakeClassStudentContainer {
  public static inicialize() {
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
  }
}