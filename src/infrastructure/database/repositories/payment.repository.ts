import { Between, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../../../utils/error";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import { PaymentEntity } from "../entities/PaymentEntity";
import { Payment } from "../../../domain/entities/Payment";
import { StatusPayment } from "../../../utils/enum/payment";
import { injectable } from "tsyringe";
import { PaymentDTO } from "../../../application/dtos/payment.dto";
import { PaymentMapper } from "../mappers/payment.mapper";

interface ICalculateRemaining {
  monthPending: number;
}

@injectable()
export class PaymentTypeOrmRepository implements IPaymentRepository {
  private readonly _repo: Repository<PaymentEntity>;

  constructor(repo?: Repository<PaymentEntity>) {
    this._repo = repo ?? AppDataSource.getRepository(PaymentEntity);
  }

  async sendUpcomingPaymentDueAlert(): Promise<Payment[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const in3Days = new Date();
    in3Days.setHours(23, 59, 59, 999);
    in3Days.setDate(in3Days.getDate() + 3);

    const payments = await this._repo.find({
      where: {
        datePayment: Between(today, in3Days),
      },
    });

    return payments.map((p) => PaymentMapper.toDomain(p));
  }

  private calculateRemainingMonthsOfYear(month: number): ICalculateRemaining[] {
    const quantityMonthYear = 12;
    const months: ICalculateRemaining[] = [];

    for (let i = month + 1; i <= quantityMonthYear; i++) {
      months.push({
        monthPending: i,
      });
    }

    return months;
  }

  async createAllPayments(data: PaymentDTO): Promise<boolean> {
    const monthReference = new Date().getMonth() + 1;
    const yearReference = new Date().getFullYear();
    const listMonths = this.calculateRemainingMonthsOfYear(monthReference);

    for (const month of listMonths) {
      const monthNumber = month.monthPending;

      const payment = new Payment(
        data.studentUuid,
        data.schoolUuid,
        data.value,
        monthNumber,
        data.dayPayment,
        yearReference,
        StatusPayment.PENDING,
        data.discountApplied,
        data.discount,
      );

      const entity = this._repo.create(payment);
      await this._repo.save(entity);
    }

    return true;
  }

  async createUnitPayment(data: Payment): Promise<boolean> {
    const payment = await this._repo.create(data);
    await this._repo.save(payment);
    return true;
  }

  async updateStatus(uuid: string, status: StatusPayment): Promise<boolean> {
    const payment = await this._repo.findOne({ where: { uuid } });

    if (!payment) throw new AppError("Pagamento inexistente");

    const updated = await this._repo.update({ uuid }, { status });
    return (updated.affected ?? 0) > 0;
  }
}
