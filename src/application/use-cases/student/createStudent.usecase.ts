import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IQueueService } from "../../../domain/contracts/IQueueService";
import { Payment } from "../../../domain/entities/Payment";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StatusPayment } from "../../../utils/enum/payment";
import { QueueEnum } from "../../../utils/enum/queue";
import { StudentDTO, StudentResponseDTO } from "../../dtos/student.dto";
import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateStudentUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,

    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private readonly _repoClassPeriod: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,

    @inject(ContainerEnum.QUEUE_SERVICE)
    private readonly _queue: IQueueService,
  ) {}

  async execute(data: StudentDTO): Promise<StudentResponseDTO | null> {
    const student = await this._repo.create(data);

    if (!student) {
      logger.error({ message: "Erro ao criar estudante" });
      return null;
    }

    await this._cache.delete(cacheKeyEnum.STUDENTS);

    const classPeriod = await this._repoClassPeriod.getByClassPeriodUuid(
      student.class.uuid,
      student.periodo.uuid,
    );

    const date = new Date();
    const payment = new Payment(
      student.uuid,
      student.escola.uuid,
      classPeriod.value,
      date.getMonth() + 1,
      data.dayPayment,
      date.getFullYear(),
      StatusPayment.PENDING,
      data.hasDiscount,
      data.discount,
    );

    logger.info({
      message: "Estudante criado com sucesso",
      studentUuid: student.uuid,
    });

    await this._queue.sendToQueue(QueueEnum.PAYMENT_NAME, payment);
    return student;
  }
}
