import { UpdateSchoolUseCase } from "../../../application/use-cases/school/UpdateSchoolUseCase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("UpdateSchoolUseCase", () => {
  it("Deve atualizar o nome da escola", async () => {
    const useCase = new UpdateSchoolUseCase(repository, cache);

    const school = await repository.createSchoolUserTransaction({
      name: "Escola teste",
      address: "Rua A",
      phone: "11999999999",
      email: "contato@escola.com",
      nameDirector: "Jhonatan",
    });

    const newData = {
      name: "Escola teste 1",
      address: school.address,
      phone: school.phone,
      email: school.email,
      nameDirector: school.nameDirector,
    };

    const updated = await useCase.execute(school.uuid, newData);

    expect(updated.name).toBe("Escola teste 1");
  });
});
