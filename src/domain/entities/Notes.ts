import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Notes extends Base {
  constructor(
    public studentUuid: string,
    public disciplineUuid: string,
    public classUuid: string,
    public periodUuid: string,
    public schoolUuid: string,
    public academiccycleUuid: string,
    public note: number,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.studentUuid) throw new ValidationEmpty("studentUuid");
    if (!this.disciplineUuid) throw new ValidationEmpty("disciplineUuid");
    if (!this.classUuid) throw new ValidationEmpty("classUuid");
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
    if (!this.periodUuid) throw new ValidationEmpty("periodUuid");
    if (!this.academiccycleUuid) throw new ValidationEmpty("academiccycleUuid");
  }
}
