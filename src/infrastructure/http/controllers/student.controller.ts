import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreateStudentUseCase } from "../../../application/use-cases/student/createStudent.usecase";
import { GetOneStudentUseCase } from "../../../application/use-cases/student/getOne.usecase";
import { GetAllStudetsUseCase } from "../../../application/use-cases/student/getAll.usecase";
import { DeleteStudentUseCase } from "../../../application/use-cases/student/deleteStudent.usecase";
import { UpdateStatusStudentUseCase } from "../../../application/use-cases/student/updateStatus.usecase";
import { UpdateStudentUseCase } from "../../../application/use-cases/student/updateStudent.usecase";
import { injectable } from "tsyringe";
import { GetStatisticsUsecase } from "../../../application/use-cases/student/getStatistics.usecase";
import { schoolByUserMiddleware } from "../middleware/schoolByUser.middleware";
import { StatusEnum } from "../../../utils/enum/status";

@injectable()
export class StudentController {
  constructor(
    private readonly _create: CreateStudentUseCase,
    private readonly _getOne: GetOneStudentUseCase,
    private readonly _getAll: GetAllStudetsUseCase,
    private readonly _update: UpdateStudentUseCase,
    private readonly _updateStatus: UpdateStatusStudentUseCase,
    private readonly _getStatistics: GetStatisticsUsecase,
    private readonly _delete: DeleteStudentUseCase,
  ) {}

  async create(req: any, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const student = await this._create.execute({
        name: req.body?.name,
        matriculation: req.body?.matriculation,
        dateBirth: req.body?.dateBirth,
        status: req.body?.status,
        nameMother: req.body?.nameMother,
        nameFather: req.body?.nameFather,
        phone: req.body?.phone,
        dateMatriculation: req.body?.dateMatriculation,
        hasDiscount: req.body?.hasDiscount,
        discount: req.body?.discount,
        dayPayment: req.body?.dayPayment,
        periodUuid: req.body?.periodUuid,
        classUuid: req.body?.classUuid,
        profileUuid: req.body?.profileUuid,
        schoolUuid: schoolUuid,
        cpf: req.body?.cpf,
        age: req.body?.age,
        address: req.body?.address,
      });
      return Handler.created(res, student);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(req: any, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const students = await this._getAll.execute(schoolUuid);
      return Handler.ok(res, students);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const student = await this._getOne.execute(uuid as string);
      return Handler.ok(res, student);
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
      const schoolUuid = schoolByUserMiddleware(req);
      const updated = await this._update.execute(uuid as string, {
        name: req.body?.name,
        matriculation: req.body?.matriculation,
        dateBirth: req.body?.dateBirth,
        status: req.body?.status,
        nameMother: req.body?.nameMother,
        nameFather: req.body?.nameFather,
        phone: req.body?.phone,
        dateMatriculation: req.body?.dateMatriculation,
        hasDiscount: req.body?.hasDiscount,
        discount: req.body?.discount,
        dayPayment: req.body?.dayPayment,
        periodUuid: req.body?.periodUuid,
        classUuid: req.body?.classUuid,
        profileUuid: req.body?.profileUuid,
        schoolUuid: schoolUuid,
        cpf: req.body?.cpf,
        age: req.body?.age,
        address: req.body?.address,
      });
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const updated = await this._updateStatus.execute(
        uuid as string,
        StatusEnum.INACTIVE,
      );
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async statistics(req: any, res: Response) {
    try {
      const schoolUuid = schoolByUserMiddleware(req);
      const updated = await this._getStatistics.execute(schoolUuid);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
