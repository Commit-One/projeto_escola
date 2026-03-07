import { CreateProfileUseCase } from "../../../application/use-cases/profile/CreateProfileUseCase";
import { FakeProfileRepository } from "../mocks/FakeProfileRepository";

const repository = new FakeProfileRepository();

describe("CreateProfileUseCase", () => {
  it("Deve criar um perfil", async () => {
    const useCase = new CreateProfileUseCase(repository);
    await useCase.execute();

    const existProfile = await repository.existByName("admin");
    expect(existProfile).toBe(true);
  });
});
