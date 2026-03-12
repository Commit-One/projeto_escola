import { CreateProfileUseCase } from "../../application/use-cases/profile/CreateProfileUseCase";
import { ProfileTypeOrmRepository } from "../../infrastructure/database/repositories/ProfileRepository";
import { ProfileController } from "../../infrastructure/http/controllers/ProfileController";
import { cacheInstance } from "../instances";

export const makeProfileContainer = () => {
  const repo = new ProfileTypeOrmRepository();

  const createUC = new CreateProfileUseCase(repo, cacheInstance);
  const controller = new ProfileController(createUC);

  return controller;
};
