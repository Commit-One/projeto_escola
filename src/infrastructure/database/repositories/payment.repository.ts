import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../../../utils/error";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { PaymentEntity } from "../entities/PaymentEntity";
import { Payment } from "../../../domain/entities/Payment";
import { PaymentMapper } from "../mappers/payment.mapper";
import { StatusPayment } from "../../../utils/enum/payment";
import { injectable } from "tsyringe";

@injectable()
export class PaymentTypeOrmRepository implements IPaymentRepository {
  private readonly _repo: Repository<PaymentEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(PaymentEntity);
  }

  async create(data: Payment): Promise<boolean> {
    const entity = PaymentMapper.toEntity(data);
    await this._repo.save(entity);
    return true;
  }

  async updateStatus(uuid: string, status: StatusPayment): Promise<boolean> {
    const payment = await this._repo.findOne({ where: { uuid } });

    if (!payment) throw new AppError("Pagamento inexistente");

    const updated = await this._repo.update({ uuid }, { status });
    return (updated.affected ?? 0) > 0;
  }
}
