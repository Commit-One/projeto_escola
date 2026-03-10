import { StatusEnum } from "../../utils/enum/status";
import { ApplicationError, ValidationError } from "../../utils/error";
import { replace } from "../../utils/functions/replace";
import { Base } from "./Base";

export class School extends Base {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public email: string,
    public nameDirector: string,
    public status: StatusEnum = StatusEnum.ACTIVE,
  ) {
    super();
    this.phone = replace(this.phone);
    this.validate()
  }

  private validate() {
    if (!this.name) throw new ValidationError(ApplicationError.school.nameSchoolRequired);
    if (!this.email) throw new ValidationError(ApplicationError.school.emailRequired);    
    if (!this.address) throw new ValidationError(ApplicationError.school.addressRequired);
    if (!this.phone) throw new ValidationError(ApplicationError.school.phoneRequired);    
    if (!this.nameDirector)
      throw new ValidationError(ApplicationError.school.nameDirectorRequired);
  }
}
