import { CreatePeriodUseCase } from "../../../application/use-cases/period/create.usecase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakePeriodoRepository } from "../mocks/FakePeriodoRepository";

const repository = new FakePeriodoRepository();
const cache = new FakeCacheRepository();

describe("CreatePeriodUseCase", () => {
  it("Deve criar um perfil", async () => {
    const useCase = new CreatePeriodUseCase(repository, cache);
    await useCase.execute();

    const existPeriodo = await repository.existByName("manhã");
    expect(existPeriodo).toBe(true);
  });
});
