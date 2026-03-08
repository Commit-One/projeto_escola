import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusEnum } from "../../../utils/enum/status";

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

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status!: StatusEnum;
}
