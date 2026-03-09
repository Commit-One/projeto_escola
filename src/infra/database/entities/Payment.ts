import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusPayment } from "../../../utils/enum/payment";

@Entity("tb_payment")
export class PaymentEntity extends Base {
  @Column()
  studentUuid!: string;

  @Column()
  schoolUuid!: string;

  @Column()
  currentValue!: number;

  @Column()
  discount!: number;

  @Column()
  valueDefault!: number;

  @Column()
  referenceMonth!: number;

  @Column()
  referenceYear!: number;

  @Column()
  referenceDay!: number;

  @Column()
  discountApplied!: boolean;

  @Column({
    type: "enum",
    enum: StatusPayment,
    default: StatusPayment.PENDING,
  })
  status!: StatusPayment;
}
