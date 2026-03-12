import { LoginDTO } from "../../../application/dtos/login.dto";
import { User } from "../../../domain/entities/User";
import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";

type ProfileFake = {
  uuid: string;
  name: string;
};

type SchoolFake = {
  uuid: string;
  name: string;
};

export class FakeLoginRepository implements ILoginRepository {
  public users: User[] = [];
  public profiles: ProfileFake[] = [];
  public schools: SchoolFake[] = [];

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }

  async schemaDatabase(email: string): Promise<LoginDTO> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const profile = this.profiles.find((p) => p.uuid === user.profileUuid);
    const school = this.schools.find((s) => s.uuid === user.schoolUuid);

    if (!profile) {
      throw new Error("Perfil não encontrado");
    }

    if (!school) {
      throw new Error("Escola não encontrada");
    }

    return {
      escola: {
        name: school.name,
        uuid: school.uuid,
      },
      profile: {
        name: profile.name,
        uuid: profile.uuid,
      },
      user: {
        email: user.email,
        name: user.email,
        uuid: user.uuid,
      },
    };
  }

  public addUser(user: User) {
    this.users.push(user);
  }

  public addProfile(profile: ProfileFake) {
    this.profiles.push(profile);
  }

  public addSchool(school: SchoolFake) {
    this.schools.push(school);
  }
}
