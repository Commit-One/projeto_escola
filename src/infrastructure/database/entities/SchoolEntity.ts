import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";
import { StatusEnum } from "../../../utils/enum/status";

@Entity("tb_school")
export class SchoolEntity extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  address!: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  phone!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  nameDirector!: string;

  @Column({ type: "varchar", length: 14, unique: true, nullable: false })
  cnpj!: string;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    nullable: false,
  })
  status!: StatusEnum;
}
