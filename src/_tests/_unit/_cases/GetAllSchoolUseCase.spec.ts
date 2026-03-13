import { GetAllSchoolUseCase } from "../../../application/use-cases/school/getAll.usecase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";
import { School } from "../../../domain/entities/School";

describe("GetAllSchoolUseCase", () => {
  it("Deve retornar todas as escolas cadastradas", async () => {
    const repository = new FakeSchoolRepository();
    const cache = new FakeCacheRepository();
    const useCase = new GetAllSchoolUseCase(repository, cache);

    const schoolEntity = new School(
      "Escola teste",
      "Rua A",
      "11999999999",
      "contato@escola.com",
      "Jhonatan",
    );

    await repository.createSchoolUserTransaction(schoolEntity);

    const schools = await useCase.execute();
    expect(schools).toHaveLength(1);
  });
});
