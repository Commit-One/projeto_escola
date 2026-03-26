import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_notes")
export class NotesEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  studentUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  classUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  periodUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  disciplineUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  schoolUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  academiccycleUuid!: string;

  @Column({ type: "double", nullable: false })
  note!: number;
}
