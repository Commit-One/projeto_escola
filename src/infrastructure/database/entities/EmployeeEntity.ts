import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusEnum } from "../../../utils/enum/status";

@Entity("tb_employee")
export class EmployeeEntity extends Base {
  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  profileUuid!: string;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    nullable: false,
  })
  status!: StatusEnum;
}
