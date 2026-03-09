import { CreateStudentUseCase } from "../../application/use-cases/student/CreateStudentUseCase";
import { DeleteStudentUseCase } from "../../application/use-cases/student/DeleteStudentUseCase";
import { GetAllStudetsUseCase } from "../../application/use-cases/student/GetAllStudetsUseCase";
import { GetOneStudentUseCase } from "../../application/use-cases/student/GetOneStudentUseCase";
import { UpdateStatusStudentUseCase } from "../../application/use-cases/student/UpdateStatusStudentUseCase";
import { UpdateStudentUseCase } from "../../application/use-cases/student/UpdateStudentUseCase";
import { StudentTypeOrmRepository } from "../../infra/database/repositories/StudentRepository";
import { StudentController } from "../../infra/http/controllers/StudentController";

export const makeStudentContainer = () => {
  const repo = new StudentTypeOrmRepository();

  const createUC = new CreateStudentUseCase(repo);
  const getAllUC = new GetAllStudetsUseCase(repo);
  const updateUC = new UpdateStudentUseCase(repo);
  const getOneUC = new GetOneStudentUseCase(repo);
  const deleteUC = new DeleteStudentUseCase(repo);
  const updateStatusUC = new UpdateStatusStudentUseCase(repo);

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
