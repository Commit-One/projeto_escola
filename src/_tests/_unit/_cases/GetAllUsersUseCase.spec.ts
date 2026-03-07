import { GetAllUsersUserCase } from "../../../application/use-cases/user/GetAllUsersUseCase";
import { FakeUserRepository } from "../mocks/FakeUserRepository";

const repository = new FakeUserRepository();

describe("GetAllUsersUseCase", () => {
  it("Deve listar todos os usuários criados", async () => {
    const useCase = new GetAllUsersUserCase(repository);

    await repository.create({
      email: "email@gmail.com",
      escolaUuid: "123",
      password: "123",
      profileUuid: "1233",
    });

    const list = await useCase.execute();

    expect(list.length).toBe(1);
  });
});
