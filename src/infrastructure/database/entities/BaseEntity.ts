import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_base")
export class Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "datetime" })
  createdAt!: Date;

  @Column({
    default: true,
  })
  enable!: boolean;

  @Column()
  @Generated("uuid")
  uuid!: string;
}
