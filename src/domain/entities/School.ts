import { StatusEnum } from "../../utils/enum/status";
import { ValidationEmpty } from "../../utils/error";
import { replace } from "../../utils/functions/replace";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class School extends Base {
  constructor(
    public name: string,
    public address: string,
    public phone: string,
    public email: string,
    public nameDirector: string,
    public cnpj: string,
    public status: StatusEnum = StatusEnum.ACTIVE,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.replaceData();
    this.validate();
  }

  private replaceData() {
    this.phone = replace(this.phone);
    this.cnpj = replace(this.cnpj);
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name");
    if (!this.cnpj) throw new ValidationEmpty("cnpj");
    if (!this.email) throw new ValidationEmpty("email");
    if (!this.address) throw new ValidationEmpty("address");
    if (!this.phone) throw new ValidationEmpty("phone");
    if (!this.nameDirector) throw new ValidationEmpty("nameDirector");
  }
}
