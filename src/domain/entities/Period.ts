import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Period extends Base {
  constructor(
    public name: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name");
  }
}
