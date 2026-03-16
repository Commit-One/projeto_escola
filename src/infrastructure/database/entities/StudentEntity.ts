import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusEnum } from "../../../utils/enum/status";

@Entity("tb_student")
export class StudentEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  matriculation!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  schoolUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  profileUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  periodUuid!: string;

  @Column({ type: "date", nullable: false })
  dateBirth!: Date;

  @Column({ type: "varchar", length: 100, nullable: false })
  nameMother!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  nameFather!: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  phone!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  classUuid!: string;

  @Column({ type: "date", nullable: false })
  dateMatriculation!: Date;

  @Column({ type: "boolean", default: false })
  hasDiscount!: boolean;

  @Column({ type: "int", nullable: false })
  discount!: number;

  @Column({ type: "int", nullable: false })
  dayPayment!: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  cpf!: string;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    nullable: false,
  })
  status!: StatusEnum;
}
