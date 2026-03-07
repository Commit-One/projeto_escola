import { CreateProfileUseCase } from "../../application/use-cases/profile/CreateProfileUseCase";
import { ProfileTypeOrmRepository } from "../../infra/database/repositories/ProfileRepository";
import { ProfileController } from "../../infra/http/controllers/ProfileController";

export const makeProfileContainer = () => {
  const repo = new ProfileTypeOrmRepository();
  const createUC = new CreateProfileUseCase(repo);
  const controller = new ProfileController(createUC);

  return controller;
};
