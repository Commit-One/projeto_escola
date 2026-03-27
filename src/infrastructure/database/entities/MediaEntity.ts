import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_media")
export class MediaEntity extends Base {
  @Column({ type: "varchar", length: 150, nullable: false })
  schoolUuid!: string;

  @Column({ type: "decimal", nullable: false })
  media!: number;
}
