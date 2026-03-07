import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetAllUsersUserCase {
  constructor(private _repo: IUserRepository) {}

  async execute() {
    const users = await this._repo.getAll();
    return users;
  }
}
