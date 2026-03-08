import { UpdateSchoolUseCase } from "../../../application/use-cases/school/UpdateSchoolUseCase";
import { UpdateStatusSchoolUseCase } from "../../../application/use-cases/school/UpdateStatusSchoolUseCase";
import { StatusEnum } from "../../../utils/enum/status";
import { FakeSchoolRepository } from "../mocks/FakeSchoolRepository";

const repository = new FakeSchoolRepository();

describe("UpdateStatusSchool.spec", () => {
  it("Deve atualizar o status da escola", async () => {
    const useCase = new UpdateStatusSchoolUseCase(repository);

    const school = await repository.createSchoolUserTransaction({
      name: "Escola teste",
      address: "Rua A",
      phone: "11999999999",
      email: "contato@escola.com",
      nameDirector: "Jhonatan",
    });

    await useCase.execute(school.uuid as string, StatusEnum.DISABLED);

    const shcoolUpdated = await repository.findByName(school.name);
    const isUpdated = shcoolUpdated?.status !== school.status;

    expect(isUpdated).toBe(true);
  });
});
