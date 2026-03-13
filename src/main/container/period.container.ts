import { CreatePeriodUseCase } from "../../application/use-cases/period/create.usecase";
import { PeriodTypeOrmRepository } from "../../infrastructure/database/repositories/period.repository";
import { PeriodController } from "../../infrastructure/http/controllers/period.controller";
import { cacheInstance } from "../instances";

export class MakePeriodContainer {
  public static inicialize() {
    const repo = new PeriodTypeOrmRepository();

    const createUC = new CreatePeriodUseCase(repo, cacheInstance);
    const controller = new PeriodController(createUC);

    return controller;
  }
}
