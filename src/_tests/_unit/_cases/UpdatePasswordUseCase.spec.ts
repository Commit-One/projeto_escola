import { UpdatePasswordUseCase } from "../../../application/use-cases/user/UpdatePasswordUseCase";
import { StatusEnum } from "../../../utils/enum/status";
import { FakeUserRepository } from "../mocks/FakeUserRepository";

const repository = new FakeUserRepository();

describe("UpdatePasswordUseCase", () => {
  it("Deve atualizar a senha do usuário", async () => {
    const useCase = new UpdatePasswordUseCase(repository);

    const user = {
      email: "email@gmail.com",
      schoolUuid: "123",
      password: "123",
      profileUuid: "1233",
      name: "Jhonatan",
      status: StatusEnum.ACTIVE,
    };

    await repository.create(user);

    const updated = await useCase.execute("312", user.email);

    expect(updated).toBe(true);
  });
});
