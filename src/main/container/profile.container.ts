import { CreateProfileUseCase } from "../../application/use-cases/profile/create.usecase";
import { ProfileTypeOrmRepository } from "../../infrastructure/database/repositories/ProfileRepository";
import { ProfileController } from "../../infrastructure/http/controllers/profile.controller";
import { cacheInstance } from "../instances";

export class MakeProfileContainer {
  public static inicialize() {
    const repo = new ProfileTypeOrmRepository();

    const createUC = new CreateProfileUseCase(repo, cacheInstance);
    const controller = new ProfileController(createUC);

    return controller;
  }
}