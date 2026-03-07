import { UserResponseDTO } from "../../../application/dtos/UserDTO";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async getAll(): Promise<UserResponseDTO[]> {
    return this.users.map((u) => {
      return {
        email: u.email,
      };
    });
  }

  async delete(uuid: string): Promise<boolean> {
    const newList = this.users
      .filter((u) => u.uuid !== uuid)
      .map((u) => u.uuid);
    return newList.includes(uuid);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async updatePassword(password: string, email: string): Promise<boolean> {
    const findOne = this.users.find((u) => u.email === email);

    if (!findOne) throw new Error("User not found");

    const updateUser = new User(
      email,
      password,
      findOne.escolaUuid as string,
      findOne.profileUuid as string,
    );

    const index = this.users.indexOf(findOne);
    this.users[index] = updateUser;

    return updateUser.password !== findOne.password;
  }
}
