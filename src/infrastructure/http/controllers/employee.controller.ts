import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateEmployeeUseCase } from "../../../application/use-cases/employee/create.usecase";
import { DeleteEmployeeUseCase } from "../../../application/use-cases/employee/delete.usecase";
import { GetAllEmployeeUseCase } from "../../../application/use-cases/employee/getAll.usecase";
import { GetOneEmployeeUseCase } from "../../../application/use-cases/employee/getOne.usecase";
import { UpdateEmployeeUseCase } from "../../../application/use-cases/employee/update.usecase";
import { Handler } from "../statusHttp";
import { UpdateStatusEmployeeUseCase } from "../../../application/use-cases/employee/updateStatus.usecase";

@injectable()
export class EmployeeController {
  constructor(
    private readonly _create: CreateEmployeeUseCase,
    private readonly _delete: DeleteEmployeeUseCase,
    private readonly _update: UpdateEmployeeUseCase,
    private readonly _updateStatus: UpdateStatusEmployeeUseCase,
    private readonly _getAll: GetAllEmployeeUseCase,
    private readonly _getOne: GetOneEmployeeUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const created = await this._create.execute(req.body);
      return Handler.created(res, created);
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
      const updated = await this._update.execute(uuid as string, req.body);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const list = await this._getAll.execute();
      return Handler.ok(res, list);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const item = await this._getOne.execute(uuid as string);
      return Handler.ok(res, item);
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
