import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class ClassStudent extends Base {
  constructor(
    public name: string,
    public maxAge: number,
    public minAge: number,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.name) throw new ValidationEmpty("name");
    if (!this.maxAge) throw new ValidationEmpty("maxAge");
    if (!this.minAge) throw new ValidationEmpty("minAge");
  }
}
