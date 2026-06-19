import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Handler } from "../statusHttp";
import { CreateScheduleUseCase } from "../../../application/use-cases/schedule/create.usecase";
import { DeleteScheduleUseCase } from "../../../application/use-cases/schedule/delete.usecase";
import { UpdateScheduleUseCase } from "../../../application/use-cases/schedule/update.usecase";
import { GetAllSchedulesUseCase } from "../../../application/use-cases/schedule/getAll.usecase";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";

@injectable()
export class ScheduleController {
  constructor(
    private readonly _create: CreateScheduleUseCase,
    private readonly _delete: DeleteScheduleUseCase,
    private readonly _update: UpdateScheduleUseCase,
    private readonly _getAll: GetAllSchedulesUseCase,
  ) {}

  async create(req: any, res: Response) {
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
      const schoolUuid = schoolByUserMiddleware(req);
      const deleted = await this._delete.execute(uuid as string, schoolUuid);
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

  async getAll(req: Request, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const list = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, list);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
