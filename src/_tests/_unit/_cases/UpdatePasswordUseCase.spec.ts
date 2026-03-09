import { UpdatePasswordUseCase } from "../../../application/use-cases/user/UpdatePasswordUseCase";
import { User } from "../../../domain/entities/User";
import { StatusEnum } from "../../../utils/enum/status";
import { FakeUserRepository } from "../mocks/FakeUserRepository";

const repository = new FakeUserRepository();

describe("UpdatePasswordUseCase", () => {
  it("Deve atualizar a senha do usuário", async () => {
    const useCase = new UpdatePasswordUseCase(repository);

    const user = new User(
      "email@gmail.com",
      "123",
      "123",
      "1233",
      "Jhonatan",
      StatusEnum.ACTIVE,
    );

    await repository.create(user);

    const updated = await useCase.execute("312", user.email);

    expect(updated).toBe(true);
  });
});
