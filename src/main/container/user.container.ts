import { GetAllUsersUserCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { UpdatePasswordUseCase } from "../../application/use-cases/user/UpdatePasswordUseCase";
import { UpdateStatusUserUseCase } from "../../application/use-cases/user/UpdateStatusUserUseCase";
import { UserTypeOrmRepository } from "../../infra/database/repositories/UserRepository";
import { UserController } from "../../infra/http/controllers/UserController";
import { cacheInstance } from "../instances/cache.instance";

export const makeUserContainer = () => {
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
};
