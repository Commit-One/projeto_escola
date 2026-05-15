import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreateClassPeriodUseCase } from "../../../application/use-cases/classPeriod/create.usecase";
import { DeleteClassPeriodUseCase } from "../../../application/use-cases/classPeriod/delete.usecase";
import { UpdateClassPeriodUseCase } from "../../../application/use-cases/classPeriod/update.usecase";
import { GetAllClassPeriodUseCase } from "../../../application/use-cases/classPeriod/getAll.usecase";
import { GetOneClassPeriodUseCase } from "../../../application/use-cases/classPeriod/getOne.usecase";
import { injectable } from "tsyringe";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";

@injectable()
export class ClassPeriodController {
  constructor(
    private readonly _create: CreateClassPeriodUseCase,
    private readonly _delete: DeleteClassPeriodUseCase,
    private readonly _update: UpdateClassPeriodUseCase,
    private readonly _getAll: GetAllClassPeriodUseCase,
    private readonly _getOne: GetOneClassPeriodUseCase,
  ) {}

  async create(req: any, res: Response) {
    try {
      const { classUuid, periodUuid, value } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const created = await this._create.execute({
        classUuid,
        periodUuid,
        value,
        schoolUuid,
      });
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
      const { classUuid, periodUuid, value } = req.body;
      const { uuid } = req.params;
      const schoolUuid = schoolByUserMiddleware(req);
      const updated = await this._update.execute(uuid as string, {
        classUuid,
        periodUuid,
        value,
        schoolUuid,
      });
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(req: any, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const getAll = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, getAll);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const getOne = await this._getOne.execute(uuid as string);
      return Handler.ok(res, getOne);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
