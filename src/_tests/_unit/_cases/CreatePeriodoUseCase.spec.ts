import { CreatePeriodUseCase } from "../../../application/use-cases/period/CreatePeriodUseCase";
import { FakePeriodoRepository } from "../mocks/FakePeriodoRepository";

const repository = new FakePeriodoRepository();

describe("CreatePeriodUseCase", () => {
  it("Deve criar um perfil", async () => {
    const useCase = new CreatePeriodUseCase(repository);
    await useCase.execute();

    const existPeriodo = await repository.existByName("manhã");
    expect(existPeriodo).toBe(true);
  });
});
