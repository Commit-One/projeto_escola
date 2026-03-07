import { GetAllUsersUserCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { UpdatePasswordUseCase } from "../../application/use-cases/user/UpdatePasswordUseCase";
import { UserTypeOrmRepository } from "../../infra/database/repositories/UserRepository";
import { UserController } from "../../infra/http/controllers/UserController";

export const makeUSerContainer = () => {
  const repo = new UserTypeOrmRepository();
  const getAll = new GetAllUsersUserCase(repo);
  const updatePassword = new UpdatePasswordUseCase(repo);
  const controller = new UserController(getAll, updatePassword);

  return controller;
};
