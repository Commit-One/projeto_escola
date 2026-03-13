import { CreateClassPeriodUseCase } from "../../application/use-cases/classPeriod/create.usecase";
import { DeleteClassPeriodUseCase } from "../../application/use-cases/classPeriod/delete.usecase";
import { GetAllClassPeriodUseCase } from "../../application/use-cases/classPeriod/getAll.usecase";
import { GetOneClassPeriodUseCase } from "../../application/use-cases/classPeriod/getOne.usecase";
import { UpdateClassPeriodUseCase } from "../../application/use-cases/classPeriod/update.usecase";
import { ClassPeriodTypeOrmRepository } from "../../infrastructure/database/repositories/classPeriod.repository";
import { ClassPeriodController } from "../../infrastructure/http/controllers/classPeriod.controller";
import { cacheInstance } from "../instances";

export class MakeClassPeriodContainer {
  public static inicialize() {
    const repo = new ClassPeriodTypeOrmRepository();
    const createUC = new CreateClassPeriodUseCase(repo, cacheInstance);
    const deleteUC = new DeleteClassPeriodUseCase(repo, cacheInstance);
    const getAllUC = new GetAllClassPeriodUseCase(repo, cacheInstance);
    const getOneUC = new GetOneClassPeriodUseCase(repo, cacheInstance);
    const updateUC = new UpdateClassPeriodUseCase(repo, cacheInstance);

    const controller = new ClassPeriodController(
      createUC,
      deleteUC,
      updateUC,
      getAllUC,
      getOneUC,
    );

    return controller;
  }
}
