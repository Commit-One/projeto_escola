import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_profile")
export class ProfileEntity extends Base {
  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  name!: string;
}
