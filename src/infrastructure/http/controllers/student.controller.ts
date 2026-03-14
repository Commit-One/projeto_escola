import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreateStudentUseCase } from "../../../application/use-cases/student/createStudent.usecase";
import { GetOneStudentUseCase } from "../../../application/use-cases/student/getOne.usecase";
import { GetAllStudetsUseCase } from "../../../application/use-cases/student/getAll.usecase";
import { DeleteStudentUseCase } from "../../../application/use-cases/student/deleteStudent.usecase";
import { UpdateStatusStudentUseCase } from "../../../application/use-cases/student/updateStatus.usecase";
import { UpdateStudentUseCase } from "../../../application/use-cases/student/updateStudent.usecase";
import { injectable } from "tsyringe";

@injectable()
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
      return Handler.created(res, student);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const students = await this._getAll.execute();
      return Handler.ok(res, students);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const student = await this._getOne.execute(uuid as string);
      return Handler.ok(res, student);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._delete.execute(uuid as string);
      return Handler.ok(res, deleted);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const body = req.body;
      const updated = await this._update.execute(uuid as string, body);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      const updated = await this._updateStatus.execute(uuid as string, status);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
