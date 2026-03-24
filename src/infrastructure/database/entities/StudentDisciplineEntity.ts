import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_student_discipline")
export class StudentDisciplineEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  studentUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  classUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  disciplineUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  schoolUuid!: string;
}
