import { StatusEnum } from "../../utils/enum/status";
import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class User extends Base {
  constructor(
    public email: string,
    public password: string,
    public schoolUuid: string,
    public profileUuid: string,
    public name: string,
    public status: StatusEnum = StatusEnum.ACTIVE,
    public last_access?: Date,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name");
    if (!this.email) throw new ValidationEmpty("email");
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
    if (!this.profileUuid) throw new ValidationEmpty("profileUuid");
  }
}
