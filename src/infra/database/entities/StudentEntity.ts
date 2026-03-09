import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusEnum } from "../../../utils/enum/status";

@Entity("tb_student")
export class StudentEntity extends Base {
  @Column()
  name!: string;

  @Column()
  matriculation!: string;

  @Column()
  schoolUuid!: string;

  @Column()
  profileUuid!: string;

  @Column()
  periodUuid!: string;

  @Column()
  dateBirth!: Date;

  @Column()
  nameMother!: string;

  @Column()
  nameFather!: string;

  @Column()
  phone!: string;

  @Column()
  classStudent!: string;

  @Column()
  dateMatriculation!: Date;

  @Column()
  hasDiscount!: boolean;

  @Column()
  discount!: number;

  @Column()
  datePayment!: Date;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status!: StatusEnum;
}
