import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Discipline extends Base {
  constructor(
    public name: string,
    public schoolUuid: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("Nome");
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
  }
}
