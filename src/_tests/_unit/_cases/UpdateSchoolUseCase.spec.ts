import { UpdateSchoolUseCase } from "../../../application/use-cases/school/update.usecase";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";
import { School } from "../../../domain/entities/School";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("UpdateSchoolUseCase", () => {
  it("Deve atualizar o nome da escola", async () => {
    const useCase = new UpdateSchoolUseCase(repository, cache);

    const schoolEntity = new School(
      "Escola teste",
      "Rua A",
      "11999999999",
      "contato@escola.com",
      "Jhonatan",
      "86.899.695/0001-00",
    );

    const school = await repository.createSchoolUserTransaction(schoolEntity);

    const newData = {
      name: "Escola teste 1",
      address: school.address,
      phone: school.phone,
      email: school.email,
      nameDirector: school.nameDirector,
      cnpj: "86.899.695/0001-00",
    };

    const updated = await useCase.execute(school.uuid, newData);

    expect(updated.name).toBe("Escola teste 1");
  });
});
