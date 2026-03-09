import { CreatePeriodUseCase } from "../../application/use-cases/period/CreatePeriodoUseCase";
import { PeriodTypeOrmRepository } from "../../infra/database/repositories/PeriodRepository";
import { PeriodController } from "../../infra/http/controllers/PeriodController";
import { cacheInstance } from "../instances/cache.instance";

export const makePeriodContainer = () => {
  const repo = new PeriodTypeOrmRepository();

  const createUC = new CreatePeriodUseCase(repo, cacheInstance);
  const controller = new PeriodController(createUC);

  return controller;
};
