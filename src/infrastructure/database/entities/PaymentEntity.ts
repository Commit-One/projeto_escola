import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusPayment } from "../../../utils/enum/payment";

@Entity("tb_payment")
export class PaymentEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  studentUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  schoolUuid!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  monthlyValue!: number;

  @Column({ type: "int", nullable: false })
  discount!: number;

  @Column({ type: "date", nullable: false })
  datePayment!: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  annualValue!: number;

  @Column({ type: "int", nullable: false })
  referenceMonth!: number;

  @Column({ type: "int", nullable: false })
  referenceYear!: number;

  @Column({ type: "int", nullable: false })
  referenceDay!: number;

  @Column({ type: "boolean", default: false })
  discountApplied!: boolean;

  @Column({
    type: "enum",
    enum: StatusPayment,
    default: StatusPayment.PENDING,
    nullable: false,
  })
  status!: StatusPayment;
}
