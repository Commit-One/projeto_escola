import { CreateSchoolUseCase } from "../../../application/use-cases/school/create.usecase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeQueue } from "../mocks/FakeQueue";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();
const queue = new FakeQueue();

describe("CreateSchoolUseCase", () => {
  it("Deve criar uma escola com sucesso", async () => {
    const useCase = new CreateSchoolUseCase(repository, cache, queue);

    const result = await useCase.execute({
      name: "Escola teste",
      address: "Rua A",
      phone: "11999999999",
      email: "contato@escola.com",
      nameDirector: "Jhonatan",
      cnpj: "86.899.695/0001-00",
    });

    expect(result).toHaveProperty("name", "Escola teste");

    const schools = await repository.getAll();
    expect(schools).toHaveLength(1);
    expect(schools[0].name).toBe("Escola teste");
  });
});
