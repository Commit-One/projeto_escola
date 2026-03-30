import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateAcademicCycleUseCase } from "../../../application/use-cases/academicCycle/create.usecase";
import { DeleteAcademicCycleUseCase } from "../../../application/use-cases/academicCycle/delete.usecase";
import { GetAllAcademicCycleUseCase } from "../../../application/use-cases/academicCycle/getAll.usecase";
import { GetOneAcademicCycleUseCase } from "../../../application/use-cases/academicCycle/getOne.usecase";
import { UpdateAcademicCycleUseCase } from "../../../application/use-cases/academicCycle/update.usecase";
import { Handler } from "../statusHttp";

@injectable()
export class AcademicCycleController {
  constructor(
    private readonly _create: CreateAcademicCycleUseCase,
    private readonly _delete: DeleteAcademicCycleUseCase,
    private readonly _update: UpdateAcademicCycleUseCase,
    private readonly _getAll: GetAllAcademicCycleUseCase,
    private readonly _getOne: GetOneAcademicCycleUseCase,
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
}
