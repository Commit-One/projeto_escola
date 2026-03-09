import { DeleteSchoolUseCase } from "../../../application/use-cases/school/DeleteSchoolUseCase";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();

describe("DeleteSchoolUseCase", () => {
  it("Deve retornar true quando deletar uma escola", async () => {
    const useCase = new DeleteSchoolUseCase(repository);

    const school = await repository.createSchoolUserTransaction({
      name: "Escola teste",
      address: "Rua A",
      phone: "11999999999",
      email: "contato@escola.com",
      nameDirector: "Jhonatan",
    });

    const deleted = await useCase.execute(school.uuid);

    expect(deleted).toBe(true);
  });
});
