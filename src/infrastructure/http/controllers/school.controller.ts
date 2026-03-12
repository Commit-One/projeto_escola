import { CreateSchoolUseCase } from "../../../application/use-cases/school/create.usecase";
import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { GetAllSchoolUseCase } from "../../../application/use-cases/school/getAll.usecase";
import { DeleteSchoolUseCase } from "../../../application/use-cases/school/delete.usecase";
import { UpdateSchoolUseCase } from "../../../application/use-cases/school/update.usecase";
import { GetSchoolByNameUseCase } from "../../../application/use-cases/school/getByName.usecase";
import { UpdateStatusSchoolUseCase } from "../../../application/use-cases/school/updateStatus.usecase";

export class SchoolController {
  constructor(
    private readonly _create: CreateSchoolUseCase,
    private readonly _getAll: GetAllSchoolUseCase,
    private readonly _delete: DeleteSchoolUseCase,
    private readonly _update: UpdateSchoolUseCase,
    private readonly _getByName: GetSchoolByNameUseCase,
    private readonly _updateStatus: UpdateStatusSchoolUseCase,
  ) {

  }

  async create(req: Request, res: Response) {
    try {
      const { address, email, name, phone, nameDirector } = req.body;
      const school = await this._create.execute({
        name,
        address,
        phone,
        email,
        nameDirector,
      });
      return Handler.created(res, school);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const schools = await this._getAll.execute();
      return Handler.ok(res, schools);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._delete.execute(String(uuid));
      return Handler.ok(res, deleted);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, address, phone, email, nameDirector } = req.body;
      const { uuid } = req.params;
      const school = await this._update.execute(String(uuid), {
        name,
        address,
        phone,
        email,
        nameDirector,
      });
      return Handler.ok(res, school);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const school = await this._getByName.execute(String(name));
      return Handler.ok(res, school);
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
