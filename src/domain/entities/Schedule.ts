import { ValidationEmpty } from "../../utils/error";
import { IBaseProps } from "../contracts/IBaseProps";
import { Base } from "./Base";

export class Schedule extends Base {
  constructor(
    public classUuid: string,
    public event: string,
    public schoolUuid: string,
    public initialHours: string,
    public endHours: string,
    public date: Date,
    public name?: string,
    baseProps?: IBaseProps,
  ) {
    super(baseProps);
    this.validate();
  }

  private validate() {
    if (!this.classUuid) throw new ValidationEmpty("classUuid");
    if (!this.event) throw new ValidationEmpty("event ");
    if (!this.schoolUuid) throw new ValidationEmpty("schoolUuid");
    if (!this.date) throw new ValidationEmpty("date");
  }
}
