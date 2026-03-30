import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Employee extends Base {
  constructor(
    public name: string,
    public email: string,
    public profileUuid: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name");
    if (!this.email) throw new ValidationEmpty("email");
    if (!this.profileUuid) throw new ValidationEmpty("profile");
  }
}
