import { CreatePeriodoUseCase } from "../../../application/use-cases/periodo/CreatePeriodoUseCase";
import { FakePeriodoRepository } from "../mocks/FakePeriodoRepository";

const repository = new FakePeriodoRepository();

describe("CreatePeriodoUseCase", () => {
  it("Deve criar um perfil", async () => {
    const useCase = new CreatePeriodoUseCase(repository);
    await useCase.execute();

    const existPeriodo = await repository.existByName("manhã");
    expect(existPeriodo).toBe(true);
  });
});
