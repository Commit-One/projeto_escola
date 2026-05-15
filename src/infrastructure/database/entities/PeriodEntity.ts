import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_periodo")
export class PeriodEntity extends Base {
  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  schoolUuid!: string;
}
