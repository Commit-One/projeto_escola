import { GetAllSchoolUseCase } from "../../../application/use-cases/school/GetAllSchoolUseCase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("GetAllSchoolUseCase", () => {
  it("Deve retornar todas as escolas cadastradas", async () => {
    const useCase = new GetAllSchoolUseCase(repository, cache);

    await repository.createSchoolUserTransaction({
      name: "Escola teste",
      address: "Rua A",
      phone: "11999999999",
      email: "contato@escola.com",
      nameDirector: "Jhonatan",
    });

    const schools = await useCase.execute();

    expect(schools.length).toBe(1);
    expect(schools[0].name).toBe("Escola teste");
  });
});
