import { UpdatePasswordUseCase } from "../../../application/use-cases/user/UpdatePasswordUseCase";
import { FakeUserRepository } from "../mocks/FakeUserRepository";

const repository = new FakeUserRepository();

describe("UpdatePasswordUseCase", () => {
  it("Deve atualizar a senha do usuário", async () => {
    const useCase = new UpdatePasswordUseCase(repository);

    const user = {
      email: "email@gmail.com",
      escolaUuid: "123",
      password: "123",
      profileUuid: "1233",
      name: "Jhonatan",
    };

    await repository.create(user);

    const updated = await useCase.execute("312", user.email);

    expect(updated).toBe(true);
  });
});
