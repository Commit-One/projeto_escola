import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { injectable } from "tsyringe";
import { CreateDisciplineUseCase } from "../../../application/use-cases/discipline/create.usecase";
import { GetAllDisciplineUseCase } from "../../../application/use-cases/discipline/getAll.usecase";
import { GetOneDisciplineUseCase } from "../../../application/use-cases/discipline/getOne.usecase";
import { DeleteDisciplineUseCase } from "../../../application/use-cases/discipline/delete.usecase";
import { UpdateDisciplineUseCase } from "../../../application/use-cases/discipline/update.usecase";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";

@injectable()
export class DisciplineController {
  constructor(
    private readonly _create: CreateDisciplineUseCase,
    private readonly _getAll: GetAllDisciplineUseCase,
    private readonly _getOne: GetOneDisciplineUseCase,
    private readonly _delete: DeleteDisciplineUseCase,
    private readonly _update: UpdateDisciplineUseCase,
  ) {}

  async getAll(req: any, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const disciplines = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, disciplines);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async create(req: any, res: Response) {
    try {
      const { name } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const created = await this._create.execute({
        name,
        schoolUuid,
      });
      return Handler.created(res, created);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const displine = await this._getOne.execute(uuid as string);
      return Handler.ok(res, displine);
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

  async update(req: any, res: Response) {
    try {
      const { uuid } = req.params;
      const { name } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const updated = await this._update.execute(uuid as string, {
        name,
        schoolUuid,
      });
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
