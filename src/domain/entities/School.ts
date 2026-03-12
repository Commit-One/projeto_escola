import { StatusEnum } from "../../utils/enum/status";
import { ValidationEmpty } from "../../utils/error";
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
    if (!this.name) throw new ValidationEmpty("name");
    if (!this.email) throw new ValidationEmpty("email");
    if (!this.address) throw new ValidationEmpty("address");
    if (!this.phone) throw new ValidationEmpty("phone");
    if (!this.nameDirector)
      throw new ValidationEmpty("nameDirector");
  }
}
