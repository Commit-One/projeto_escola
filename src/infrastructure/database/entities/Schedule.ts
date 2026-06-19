import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_schedule")
export class ScheduleEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  classUuid!: string;

  @Column({ type: "text", nullable: false })
  event!: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  initialHours!: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  endHours!: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  schoolUuid!: string;

  @Column({ type: "datetime", nullable: false })
  date!: Date;
}
