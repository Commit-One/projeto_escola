import { CreatePeriodoUseCase } from "../../application/use-cases/periodo/CreatePeriodoUseCase";
import { PeriodoTypeOrmRepository } from "../../infra/database/repositories/PeriodoRepository";
import { PeriodoController } from "../../infra/http/controllers/PeriodoController";

export const makePeriodoContainer = () => {
  const repo = new PeriodoTypeOrmRepository();
  const createUC = new CreatePeriodoUseCase(repo);
  const controller = new PeriodoController(createUC);

  return controller;
};
