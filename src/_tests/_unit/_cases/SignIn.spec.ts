process.env.JWT_SECRET = "teste-secret";
process.env.JWT_EXPIRES_IN = "1d";

import { SignInUseCase } from "../../../application/use-cases/login/signIn.usecase";
import { AuthenticationSecurity } from "../../../infrastructure/security/auth";
import { BcryptSecurity } from "../../../infrastructure/security/bcrypt";
import { User } from "../../../domain/entities/User";
import { FakeLoginRepository } from "../mocks/FakeLoginRepository";

describe("Valida a autenticação ", () => {
  const _repo = new FakeLoginRepository();
  const useCase = new SignInUseCase(
    _repo,
    new AuthenticationSecurity(),
    new BcryptSecurity(),
  );
  const profileUuid = crypto.randomUUID();
  const schoolUuid = crypto.randomUUID();

  const initialValues = async () => {
    _repo.addProfile({
      uuid: profileUuid,
      name: "admin",
    });

    _repo.addSchool({
      uuid: schoolUuid,
      name: "Escola 1",
    });

    const hashedPassword = await new BcryptSecurity().hash("123456");

    const user = new User(
      "jhonatan@email.com",
      hashedPassword,
      schoolUuid,
      profileUuid,
      "Jhonatan",
    );

    _repo.addUser(user);

    return user;
  };

  it("Deve montar o schemaDatabase corretamente", async () => {
    const initial = await initialValues();
    const result = await _repo.schemaDatabase(initial.email);

    expect(result).toEqual({
      escola: {
        name: result.escola.name,
        uuid: schoolUuid,
      },
      profile: {
        name: result.profile.name,
        uuid: profileUuid,
      },
      user: {
        email: initial.email,
        uuid: initial.uuid,
        name: initial.email,
      },
    });
  });

  it("Deve retornar o token de autenticação", async () => {
    const initial = await initialValues();
    const jwt = await useCase.execute(initial.email, "123456");

    expect(jwt.token).toBeDefined();
    expect(typeof jwt.token).toBe("string");
  });

  it("deve lançar erro se usuário não existir", async () => {
    await expect(_repo.schemaDatabase("naoexiste@email.com")).rejects.toThrow(
      "Usuário não encontrado",
    );
  });
});
