import { CreateSchoolUseCase } from "../../../application/use-cases/school/CreateSchoolUseCase";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();

describe("CreateSchoolUseCase", () => {
  it("Deve criar uma escola com sucesso", async () => {
    const useCase = new CreateSchoolUseCase(repository);

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
