import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_periodo")
export class PeriodEntity extends Base {
  @Column()
  name!: string;
}
