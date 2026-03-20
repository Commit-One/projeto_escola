import { UpdateStatusSchoolUseCase } from "../../../application/use-cases/school/updateStatus.usecase";
import { StatusEnum } from "../../../utils/enum/status";
import { FakeCacheRepository } from "../mocks/FakeCacheRepository";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";
import { School } from "../../../domain/entities/School";

const repository = new FakeSchoolRepository();
const cache = new FakeCacheRepository();

describe("UpdateStatusSchool.spec", () => {
  it("Deve atualizar o status da escola", async () => {
    const useCase = new UpdateStatusSchoolUseCase(repository, cache);

    const schoolEntity = new School(
      "Escola teste",
      "Rua A",
      "11999999999",
      "contato@escola.com",
      "Jhonatan",
      "86.899.695/0001-00",
    );

    const school = await repository.createSchoolUserTransaction(schoolEntity);

    await useCase.execute(school.uuid, StatusEnum.DISABLED);

    const schoolUpdated = await repository.findByName(school.name);

    expect(schoolUpdated).toBeDefined();
    expect(schoolUpdated?.status).toBe(StatusEnum.DISABLED);
  });
});
