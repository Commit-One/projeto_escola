import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_user")
export class UserEntity extends Base {
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  escolaUuid!: string;

  @Column()
  profileUuid!: string;

  @Column()
  name!: string;
}
