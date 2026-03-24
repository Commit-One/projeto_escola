import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class StudentDiscipline extends Base {
  constructor(
    public studentUuid: string,
    public disciplineUuid: string,
    public classUuid: string,
    public schoolUuid: string,
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
  }
}
