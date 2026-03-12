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
    private readonly _create: CreateStudentUseCase,
    private readonly _getOne: GetOneStudentUseCase,
    private readonly _getAll: GetAllStudetsUseCase,
    private readonly _update: UpdateStudentUseCase,
    private readonly _updateStatus: UpdateStatusStudentUseCase,
    private readonly _delete: DeleteStudentUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body = req.body;

      const student = await this._create.execute(body);
      return handler.created(res, student);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const students = await this._getAll.execute();
      return handler.ok(res, students);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const student = await this._getOne.execute(uuid as string);
      return handler.ok(res, student);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._delete.execute(uuid as string);
      return handler.ok(res, deleted);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const body = req.body;
      const updated = await this._update.execute(uuid as string, body);
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      const updated = await this._updateStatus.execute(uuid as string, status);
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
