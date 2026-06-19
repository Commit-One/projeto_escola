import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateMediaUseCase } from "../../../application/use-cases/media/create.usecase";
import { DeleteMediaUseCase } from "../../../application/use-cases/media/delete.usecase";
import { GetAllMediaUseCase } from "../../../application/use-cases/media/getAll.usecase";
import { GetOneMediaUseCase } from "../../../application/use-cases/media/getOne.usecase";
import { UpdateMediaUseCase } from "../../../application/use-cases/media/update.usecase";
import { Handler } from "../statusHttp";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";

@injectable()
export class MediaController {
  constructor(
    private readonly _create: CreateMediaUseCase,
    private readonly _delete: DeleteMediaUseCase,
    private readonly _update: UpdateMediaUseCase,
    private readonly _getAll: GetAllMediaUseCase,
    private readonly _getOne: GetOneMediaUseCase,
  ) {}

  async create(req: any, res: Response) {
    try {
      const { media } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const created = await this._create.execute({ media, schoolUuid });
      return Handler.created(res, created);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: any, res: Response) {
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
      const { media } = req.body;
      const schoolUuid = schoolByUserMiddleware(req);
      const updated = await this._update.execute(uuid as string, {
        media,
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
      const list = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, list);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: any, res: Response) {
    try {
      const { uuid } = req.params;
      const schoolUuid = schoolByUserMiddleware(req);
      const item = await this._getOne.execute(uuid as string, schoolUuid);
      return Handler.ok(res, item);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
