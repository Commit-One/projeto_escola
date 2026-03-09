import { UpdateStatusUserUseCase } from "../../../application/use-cases/user/UpdateStatusUserUseCase";
import { User } from "../../../domain/entities/User";
import { StatusEnum } from "../../../utils/enum/status";
import { FakeUserRepository } from "../mocks/FakeUserRepository";

const repository = new FakeUserRepository();

describe("UpdateStatusUser.spec", () => {
  it("Deve atualizar o status do usuário", async () => {
    const useCase = new UpdateStatusUserUseCase(repository);

    const user = new User(
      "jhonatan@gmail.com",
      "123",
      "123",
      "321",
      "Jhonatan",
      StatusEnum.ACTIVE,
    );
    await repository.create(user);

    await useCase.execute(user.uuid, StatusEnum.DISABLED);

    const userUpdated = await repository.findByEmail(user.email);
    const isUpdated = userUpdated?.status !== user.status;

    expect(isUpdated).toBe(true);
  });
});
