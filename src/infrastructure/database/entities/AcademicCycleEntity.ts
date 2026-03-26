import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_academic_cycle")
export class AcademicCycleEntity extends Base {
  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;
}
