import { CreateSchoolUseCase } from "../../../application/use-cases/school/create.usecase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("CreateSchoolUseCase", () => {
  it("Deve criar uma escola com sucesso", async () => {
    const useCase = new CreateSchoolUseCase(repository, cache);

    const result = await useCase.execute({
      name: "Escola teste",
      address: "Rua A",
      phone: "11999999999",
      email: "contato@escola.com",
      nameDirector: "Jhonatan",
    });

    expect(result).toHaveProperty("name", "Escola teste");

    const schools = await repository.getAll();
    expect(schools).toHaveLength(1);
    expect(schools[0].name).toBe("Escola teste");
  });
});
