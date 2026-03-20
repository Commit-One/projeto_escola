import { DeleteSchoolUseCase } from "../../../application/use-cases/school/delete.usecase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";
import { School } from "../../../domain/entities/School";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("DeleteSchoolUseCase", () => {
  it("Deve retornar true quando deletar uma escola", async () => {
    const useCase = new DeleteSchoolUseCase(repository, cache);

    const schoolEntity = new School(
      "Escola teste",
      "Rua A",
      "11999999999",
      "contato@escola.com",
      "Jhonatan",
      "86.899.695/0001-00",
    );

    const school = await repository.createSchoolUserTransaction(schoolEntity);

    const deleted = await useCase.execute(school.uuid);

    expect(deleted).toBe(true);
  });
});
