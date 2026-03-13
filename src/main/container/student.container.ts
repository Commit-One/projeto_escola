import { CreateStudentUseCase } from "../../application/use-cases/student/createStudent.usecase";
import { DeleteStudentUseCase } from "../../application/use-cases/student/deleteStudent.usecase";
import { GetAllStudetsUseCase } from "../../application/use-cases/student/getAll.usecase";
import { GetOneStudentUseCase } from "../../application/use-cases/student/getOne.usecase";
import { UpdateStatusStudentUseCase } from "../../application/use-cases/student/updateStatus.usecase";
import { UpdateStudentUseCase } from "../../application/use-cases/student/updateStudent.usecase";
import { StudentTypeOrmRepository } from "../../infrastructure/database/repositories/student.repository";
import { StudentController } from "../../infrastructure/http/controllers/student.controller";
import { cacheInstance } from "../instances";

export class MakeStudentContainer {
  public static inicialize() {
    const repo = new StudentTypeOrmRepository();

    const createUC = new CreateStudentUseCase(repo, cacheInstance);
    const getAllUC = new GetAllStudetsUseCase(repo, cacheInstance);
    const updateUC = new UpdateStudentUseCase(repo, cacheInstance);
    const getOneUC = new GetOneStudentUseCase(repo, cacheInstance);
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
  }
}
