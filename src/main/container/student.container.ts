import { CreateStudentUseCase } from "../../application/use-cases/student/CreateStudentUseCase";
import { DeleteStudentUseCase } from "../../application/use-cases/student/DeleteStudentUseCase";
import { GetAllStudetsUseCase } from "../../application/use-cases/student/GetAllStudetsUseCase";
import { GetOneStudentUseCase } from "../../application/use-cases/student/GetOneStudentUseCase";
import { UpdateStatusStudentUseCase } from "../../application/use-cases/student/UpdateStatusStudentUseCase";
import { UpdateStudentUseCase } from "../../application/use-cases/student/UpdateStudentUseCase";
import { StudentTypeOrmRepository } from "../../infra/database/repositories/StudentRepository";
import { StudentController } from "../../infra/http/controllers/StudentController";
import { cacheInstance } from "../instances/cache.instance";

export const makeStudentContainer = () => {
  const repo = new StudentTypeOrmRepository();

  const createUC = new CreateStudentUseCase(repo, cacheInstance);
  const getAllUC = new GetAllStudetsUseCase(repo, cacheInstance);
  const updateUC = new UpdateStudentUseCase(repo, cacheInstance);
  const getOneUC = new GetOneStudentUseCase(repo);
  const deleteUC = new DeleteStudentUseCase(repo, cacheInstance);
  const updateStatusUC = new UpdateStatusStudentUseCase(repo, cacheInstance);

  const controller = new StudentController(
    createUC,
    getOneUC,
    getAllUC,
    updateUC,
    updateStatusUC,
    deleteUC,
  );

  return controller;
};
