import { dateForMySQL } from "./../../utils/functions/dateForMySQL";
import { StatusEnum } from "../../utils/enum/status";
import { replace } from "../../utils/functions/replace";
import { Base } from "./Base";

export class Student extends Base {
  constructor(
    public schoolUuid: string,
    public matriculation: string,
    public dateBirth: Date,
    public status: StatusEnum = StatusEnum.ACTIVE,
    public nameMother: string,
    public nameFather: string,
    public name: string,
    public phone: string,
    public classStudentUuid: string,
    public periodUuid: string,
    public dateMatriculation: Date,
    public hasDiscount: boolean,
    public discount: number,
    public datePayment: Date,
    public profileUuid: string,
  ) {
    super();

    this.phone = replace(this.phone);
    this.dateBirth = dateForMySQL(this.dateBirth);
    this.dateMatriculation = dateForMySQL(this.dateMatriculation);
    this.datePayment = dateForMySQL(this.datePayment);
  }
}
