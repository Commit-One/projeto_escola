import { CreateProfileUseCase } from "../../application/use-cases/profile/CreateProfileUseCase";
import { ProfileTypeOrmRepository } from "../../infra/database/repositories/ProfileRepository";
import { ProfileController } from "../../infra/http/controllers/ProfileController";
import { cacheInstance } from "../instances/cache.instance";

export const makeProfileContainer = () => {
  const repo = new ProfileTypeOrmRepository();

  const createUC = new CreateProfileUseCase(repo, cacheInstance);
  const controller = new ProfileController(createUC);

  return controller;
};
