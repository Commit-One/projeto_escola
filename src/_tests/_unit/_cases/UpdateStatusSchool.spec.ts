import { UpdateSchoolUseCase } from "../../../application/use-cases/school/update.usecase";
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
    );

    const school = await repository.createSchoolUserTransaction(schoolEntity);

    await useCase.execute(school.uuid, StatusEnum.DISABLED);

    const shcoolUpdated = await repository.findByName(school.name);
    const isUpdated = shcoolUpdated?.status !== school.status;

    expect(isUpdated).toBe(true);
  });
});
