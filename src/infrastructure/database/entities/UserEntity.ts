import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusEnum } from "../../../utils/enum/status";

@Entity("tb_user")
export class UserEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  schoolUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  profileUuid!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    nullable: false,
  })
  status!: StatusEnum;
}
