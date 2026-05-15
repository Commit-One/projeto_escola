import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_class_period")
export class ClassPeriodEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  periodUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  classUuid!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  value!: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  schoolUuid!: string;
}
