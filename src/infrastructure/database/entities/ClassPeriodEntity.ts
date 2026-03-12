import { Column, Entity } from "typeorm";
import { Base } from "./BaseEntity";

@Entity("tb_class_period")
export class ClassPeriodEntity extends Base {
    @Column()
    periodUuid!: string

    @Column()
    classStudentUuid!: string

    @Column()
    value!: number
}
