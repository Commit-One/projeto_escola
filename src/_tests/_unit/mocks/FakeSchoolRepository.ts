import { SchoolDTO } from "../../../application/dtos/school.dto";
import { Profile } from "../../../domain/entities/Profile";
import { School } from "../../../domain/entities/School";
import { User } from "../../../domain/entities/User";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { StatusEnum } from "../../../utils/enum/status";

export class FakeSchoolRepository implements ISchoolRepository {
  private schools: School[] = [];
  private users: User[] = [];

  async updateStatus(uuid: string, status: StatusEnum): Promise<boolean> {
    const school = this.schools.find((item) => item.uuid === uuid);
    if (!school) return false;
    school.status = status;
    return true;
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
      data.cnpj,
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

  async create(school: School): Promise<School> {
    this.schools.push(school);
    return school;
  }

  async createSchoolUserTransaction(school: School): Promise<School> {
    const profile = new Profile("escola");
    const user = new User(
      school.email,
      crypto.randomUUID(),
      crypto.randomUUID(),
      profile.uuid,
      school.nameDirector,
    );

    if (!profile.name) throw new Error("Perfil não encontrado");
    if (!user.uuid) throw new Error("Não foi possível criar o usuário");

    this.schools.push(school);
    this.users.push(user);

    return school;
  }
}
