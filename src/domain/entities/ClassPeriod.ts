import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class ClassPeriod extends Base {
  constructor(
    public value: number,
    public classStudentUuid: string,
    public perodUuid: string,
    public status: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.perodUuid) throw new ValidationEmpty("perodUuid");
    if (!this.classStudentUuid) throw new ValidationEmpty("classStudentUuid");
    if (!this.value || this.value === 0) throw new ValidationEmpty("value");
  }
}
