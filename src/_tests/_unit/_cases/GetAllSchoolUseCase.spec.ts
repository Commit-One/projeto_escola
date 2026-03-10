import { GetAllSchoolUseCase } from "../../../application/use-cases/school/GetAllSchoolUseCase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";
import { School } from "../../../domain/entities/School";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("GetAllSchoolUseCase", () => {
  it("Deve retornar todas as escolas cadastradas", async () => {
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

    expect(schools.length).toBe(1);
    expect(schools[0].name).toBe("Escola teste");
  });
});
