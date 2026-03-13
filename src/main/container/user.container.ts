import { GetAllUsersUserCase } from "../../application/use-cases/user/getAll.usecase";
import { UpdatePasswordUseCase } from "../../application/use-cases/user/updatePassword.usecase";
import { UpdateStatusUserUseCase } from "../../application/use-cases/user/updateStatus.usecase";
import { UserTypeOrmRepository } from "../../infrastructure/database/repositories/user.repository";
import { UserController } from "../../infrastructure/http/controllers/user.controller";
import { cacheInstance } from "../instances";

export class MakeUserContainer {
  public static inicialize() {
    const repo = new UserTypeOrmRepository();

    const getAllUC = new GetAllUsersUserCase(repo, cacheInstance);
    const updateStatusUC = new UpdateStatusUserUseCase(repo, cacheInstance);
    const updatePasswordUC = new UpdatePasswordUseCase(repo);

    const controller = new UserController(
      getAllUC,
      updatePasswordUC,
      updateStatusUC,
    );

    return controller;
  }
}
