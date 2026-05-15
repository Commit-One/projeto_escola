import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_class")
export class ClassStudentEntity extends Base {
  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  name!: string;

  @Column({ type: "int", nullable: false })
  maxAge!: number;

  @Column({ type: "int", nullable: false })
  minAge!: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  schoolUuid!: string;
}
