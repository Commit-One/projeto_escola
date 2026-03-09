import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { GetAllUsersUserCase } from "../../../application/use-cases/user/GetAllUsersUseCase";
import { UpdatePasswordUseCase } from "../../../application/use-cases/user/UpdatePasswordUseCase";
import { UpdateStatusUserUseCase } from "../../../application/use-cases/user/UpdateStatusUserUseCase";
import { CreateStudentUseCase } from "../../../application/use-cases/student/CreateStudentUseCase";
import { GetOneStudentUseCase } from "../../../application/use-cases/student/GetOneStudentUseCase";
import { GetAllStudetsUseCase } from "../../../application/use-cases/student/GetAllStudetsUseCase";
import { DeleteStudentUseCase } from "../../../application/use-cases/student/DeleteStudentUseCase";
import { UpdateStatusStudentUseCase } from "../../../application/use-cases/student/UpdateStatusStudentUseCase";
import { UpdateStudentUseCase } from "../../../application/use-cases/student/UpdateStudentUseCase";

export class StudentController {
  constructor(
    private readonly _createStudent: CreateStudentUseCase,
    private readonly _getOneStudent: GetOneStudentUseCase,
    private readonly _getAllStudents: GetAllStudetsUseCase,
    private readonly _updateStudent: UpdateStudentUseCase,
    private readonly _updateStatusStudent: UpdateStatusStudentUseCase,
    private readonly _deleteStudent: DeleteStudentUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body = req.body;

      const student = await this._createStudent.execute(body);
      return handler.created(res, student);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const students = await this._getAllStudents.execute();
      return handler.ok(res, students);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const student = await this._getOneStudent.execute(uuid as string);
      return handler.ok(res, student);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._deleteStudent.execute(uuid as string);
      return handler.ok(res, deleted);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const body = req.body;
      const updated = await this._updateStudent.execute(uuid as string, body);
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      const updated = await this._updateStatusStudent.execute(
        uuid as string,
        status,
      );
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
