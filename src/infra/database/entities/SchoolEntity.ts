import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_school")
export class SchoolEntity extends Base {
  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;
}
