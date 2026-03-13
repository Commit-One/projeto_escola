import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentDTO, StudentResponseDTO } from "../../dtos/student.dto";

export class CreateStudentUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    // private readonly _repoClassPeriod: IStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(data: StudentDTO): Promise<StudentResponseDTO> {
    const student = await this._repo.create(data);
    if (student) await this._cache.delete(cacheKeyEnum.STUDENTS);

    //TODO: Mandar para a fila de criar pagamento

    // const date = new Date();
    // TODO: Publicar fila
    //  TODO: tipos de pagamentos: Anual / sementral
    // const payment = new Payment(
    //   student.uuid,
    //   school.uuid,
    //   300,
    //   date.getMonth() + 2,
    //   data.dayPayment,
    //   date.getFullYear(),
    //   StatusPayment.PENDING,
    //   data.hasDiscount,
    //   data.discount,
    // );

    return student;
  }
}
