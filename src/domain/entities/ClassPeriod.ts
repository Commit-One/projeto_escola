import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class ClassPeriod extends Base {
  constructor(
    public value: number,
    public classUuid: string,
    public periodUuid: string,
    public schoolUuid: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.periodUuid) throw new ValidationEmpty("periodUuid");
    if (!this.classUuid) throw new ValidationEmpty("classUuid");
    if (!this.value) throw new ValidationEmpty("value");
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
  }
}
