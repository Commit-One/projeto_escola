import { GetAllUsersUserCase } from "../../../application/use-cases/user/GetAllUsersUseCase";
import { User } from "../../../domain/entities/User";
import { StatusEnum } from "../../../utils/enum/status";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeUserRepository } from "../mocks/FakeUserRepository";

const repository = new FakeUserRepository();
const cache = new FakeCacheRepository();

describe("GetAllUsersUseCase", () => {
  it("Deve listar todos os usuários criados", async () => {
    const useCase = new GetAllUsersUserCase(repository, cache);

    const user = new User(
      "email@gmail.com",
      "123",
      "123",
      "1233",
      "Jhonatan",
      StatusEnum.ACTIVE,
    );

    await repository.create(user);

    const list = await useCase.execute();

    expect(list.length).toBe(1);
  });
});
