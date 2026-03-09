import { SchoolDTO } from "../../../application/dtos/SchoolDTO";
import { Profile } from "../../../domain/entities/Profile";
import { School } from "../../../domain/entities/School";
import { User } from "../../../domain/entities/User";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { StatusEnum } from "../../../utils/enum/status";

export class FakeSchoolRepository implements ISchoolRepository {
  private schools: School[] = [];
  private users: User[] = [];

  async updateStatus(uuid: string, status: StatusEnum): Promise<boolean> {
    const findOne = this.schools.find((s) => s.uuid === uuid);

    if (!findOne) throw new Error("School not found");

    const updatedSchool = new School(
      findOne.name,
      findOne.address,
      findOne.phone,
      findOne.email,
      findOne.nameDirector,
      status,
    );

    const index = this.schools.indexOf(findOne);
    this.schools[index] = updatedSchool;

    return this.schools.find((s) => s.uuid === uuid)?.status === status;
  }

  async getAll(): Promise<School[]> {
    return this.schools;
  }

  async delete(uuid: string): Promise<boolean> {
    const findOne = this.schools.find((s) => s.uuid === uuid);

    return !!findOne;
  }

  async update(uuid: string, data: SchoolDTO): Promise<School> {
    const findOne = this.schools.find((s) => s.uuid === uuid);

    if (!findOne) throw new Error("School not found");

    const updatedSchool = new School(
      data.name,
      data.address,
      data.phone,
      data.email,
      data.nameDirector,
    );

    const index = this.schools.indexOf(findOne);
    this.schools[index] = updatedSchool;

    return updatedSchool;
  }

  async findByName(name: string): Promise<School | null> {
    const find = this.schools.find(
      (s) => s.name.toLowerCase() === name.toLowerCase(),
    );

    return find || null;
  }

  async createSchoolUserTransaction(data: SchoolDTO): Promise<School> {
    const { address, email, name, phone, nameDirector } = data;

    const school = new School(name, address, phone, email, nameDirector);
    const profile = new Profile("escola");
    const user = new User(
      email,
      "123",
      school.uuid,
      profile.uuid,
      nameDirector,
    );

    if (!profile.name) new Error("Perfil não encontrado");
    if (!user.uuid) new Error("Não foi possível criar o usuário");

    await this.schools.push(school);
    await this.users.push(user);

    return school;
  }
}
