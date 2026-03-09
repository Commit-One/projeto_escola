import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_base")
export class Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt!: Date;

  @Column({
    default: true,
  })
  enable!: boolean;

  @Column()
  uuid!: string;
}
