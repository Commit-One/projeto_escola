import { CreateSchoolUseCase } from "../../../application/use-cases/school/CreateSchoolUseCase";
import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { GetAllSchoolUseCase } from "../../../application/use-cases/school/GetAllSchoolUseCase";
import { DeleteSchoolUseCase } from "../../../application/use-cases/school/DeleteSchoolUseCase";
import { UpdateSchoolUseCase } from "../../../application/use-cases/school/UpdateSchoolUseCase";
import { GetSchoolByNameUseCase } from "../../../application/use-cases/school/GetSchoolByNameUseCase";
import { UpdateStatusSchoolUseCase } from "../../../application/use-cases/school/UpdateStatusSchoolUseCase";

export class SchoolController {
  constructor(
    private readonly _createSchoolUseCase: CreateSchoolUseCase,
    private readonly _getAllSchoolsUseCase: GetAllSchoolUseCase,
    private readonly _deleteSchoolUseCase: DeleteSchoolUseCase,
    private readonly _updateSchoolUseCase: UpdateSchoolUseCase,
    private readonly _getSchoolByNameUseCase: GetSchoolByNameUseCase,
    private readonly _updateStatusSchool: UpdateStatusSchoolUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { address, email, name, phone, nameDirector } = req.body;
      const school = await this._createSchoolUseCase.execute({
        name,
        address,
        phone,
        email,
        nameDirector,
      });
      return handler.created(res, school);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const schools = await this._getAllSchoolsUseCase.execute();
      return handler.ok(res, schools);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._deleteSchoolUseCase.execute(String(uuid));
      return handler.ok(res, deleted);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, address, phone, email, nameDirector } = req.body;
      const { uuid } = req.params;
      const school = await this._updateSchoolUseCase.execute(String(uuid), {
        name,
        address,
        phone,
        email,
        nameDirector,
      });
      return handler.ok(res, school);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const school = await this._getSchoolByNameUseCase.execute(String(name));
      return handler.ok(res, school);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { status } = req.body;
      const updated = await this._updateStatusSchool.execute(
        uuid as string,
        status,
      );
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
