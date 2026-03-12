import { CreatePeriodUseCase } from "../../application/use-cases/period/CreatePeriodoUseCase";
import { PeriodTypeOrmRepository } from "../../infrastructure/database/repositories/PeriodRepository";
import { PeriodController } from "../../infrastructure/http/controllers/PeriodController";
import { cacheInstance } from "../instances";

export const makePeriodContainer = () => {
  const repo = new PeriodTypeOrmRepository();

  const createUC = new CreatePeriodUseCase(repo, cacheInstance);
  const controller = new PeriodController(createUC);

  return controller;
};
