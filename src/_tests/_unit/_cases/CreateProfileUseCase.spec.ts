import { CreateProfileUseCase } from "../../../application/use-cases/profile/CreateProfileUseCase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeProfileRepository } from "../mocks/FakeProfileRepository";

const repository = new FakeProfileRepository();
const cache = new FakeCacheRepository();

describe("CreateProfileUseCase", () => {
  it("Deve criar um perfil", async () => {
    const useCase = new CreateProfileUseCase(repository, cache);
    await useCase.execute();

    const existProfile = await repository.existByName("admin");
    expect(existProfile).toBe(true);
  });
});
