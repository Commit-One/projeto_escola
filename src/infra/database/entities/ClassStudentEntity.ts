import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_class")
export class ClassStudentEntity extends Base {
  @Column()
  name!: string;

  @Column()
  maxAge!: number;

  @Column()
  minAge!: number;
}
