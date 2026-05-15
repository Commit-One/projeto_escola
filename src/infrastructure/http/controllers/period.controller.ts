import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreatePeriodUseCase } from "../../../application/use-cases/period/create.usecase";
import { injectable } from "tsyringe";
import { GetAllPeriodUseCase } from "../../../application/use-cases/period/getAll.usecase";
import { UpdatePeriodUseCase } from "../../../application/use-cases/period/update.usecase";
import { DeletePeriodUseCase } from "../../../application/use-cases/period/delete.usecase";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";

@injectable()
export class PeriodController {
  constructor(
    private readonly _create: CreatePeriodUseCase,
    private readonly _getAll: GetAllPeriodUseCase,
    private readonly _update: UpdatePeriodUseCase,
    private readonly _delete: DeletePeriodUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const user = await this._create.execute(name, schoolUuid);
      return Handler.created(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(req: any, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const user = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { name } = req.body;
      const user = await this._update.execute(uuid as string, {
        name,
      });
      return Handler.ok(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const user = await this._delete.execute(uuid as string);
      return Handler.ok(res, user);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
