import { dateForMySQL } from "./../../utils/functions/dateForMySQL";
import { StatusEnum } from "../../utils/enum/status";
import { replace } from "../../utils/functions/replace";
import { Base } from "./Base";
import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";

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
    public hasDiscount: boolean = false,
    public discount: number,
    public dayPayment: number,
    public profileUuid: string,
    public cpf: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.profileUuid = "b8509789-9180-4345-a19e-386b14b81a90";
    this.validate();
    this.formatFields();
  }

  private formatFields() {
    this.cpf = replace(this.cpf);
    this.phone = replace(this.phone);
    this.dateBirth = dateForMySQL(this.dateBirth);
    this.dateMatriculation = dateForMySQL(this.dateMatriculation);
  }

  private validate() {
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
    if (!this.matriculation) throw new ValidationEmpty("matriculation");
    if (!this.dateBirth) throw new ValidationEmpty("dateBirth");
    if (!this.nameMother) throw new ValidationEmpty("nameMother");
    if (!this.nameFather) throw new ValidationEmpty("nameFather");
    if (!this.name) throw new ValidationEmpty("name");
    if (!this.phone) throw new ValidationEmpty("phone");
    if (!this.classStudentUuid) throw new ValidationEmpty("classStudentUuid");
    if (!this.periodUuid) throw new ValidationEmpty("periodUuid");
    if (!this.dateMatriculation) throw new ValidationEmpty("dateMatriculation");
    if (!this.hasDiscount) throw new ValidationEmpty("hasDiscount");
    if (!this.discount) throw new ValidationEmpty("discount");
    if (!this.dayPayment) throw new ValidationEmpty("dayPayment");
    if (!this.profileUuid) throw new ValidationEmpty("profileUuid");
  }
}
