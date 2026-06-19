import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateEmployeeUseCase } from "../../../application/use-cases/employee/create.usecase";
import { DeleteEmployeeUseCase } from "../../../application/use-cases/employee/delete.usecase";
import { GetAllEmployeeUseCase } from "../../../application/use-cases/employee/getAll.usecase";
import { GetOneEmployeeUseCase } from "../../../application/use-cases/employee/getOne.usecase";
import { UpdateEmployeeUseCase } from "../../../application/use-cases/employee/update.usecase";
import { Handler } from "../statusHttp";
import { UpdateStatusEmployeeUseCase } from "../../../application/use-cases/employee/updateStatus.usecase";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";

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

  async create(req: any, res: Response) {
    try {
      const { name, email } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const profileUuid = req.user.profile.uuid;

      const created = await this._create.execute({
        name,
        email,
        schoolUuid,
        profileUuid,
      });
      return Handler.created(res, created);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const schoolUuid = schoolByUserMiddleware(req);
      const deleted = await this._delete.execute(uuid as string, schoolUuid);
      return Handler.ok(res, deleted);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: any, res: Response) {
    try {
      const { uuid } = req.params;
      const { name, email } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const profileUuid = req.user.profile.uuid;
      const updated = await this._update.execute(uuid as string, {
        name,
        email,
        schoolUuid,
        profileUuid,
      });
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const list = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, list);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const schoolUuid = schoolByUserMiddleware(req);
      const item = await this._getOne.execute(uuid as string, schoolUuid);
      return Handler.ok(res, item);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async updateStatus(req: any, res: Response) {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const updated = await this._updateStatus.execute(
        uuid as string,
        status,
        schoolUuid,
      );
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
