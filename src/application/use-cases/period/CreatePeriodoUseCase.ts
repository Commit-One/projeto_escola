import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";

export class CreatePeriodUseCase {
  constructor(private _periodRepository: IPeriodRepository) {}

  async execute(): Promise<boolean> {
    const listProfile = ["manhã", "tarde", "noite"];

    listProfile.forEach(async (profile) => {
      const isExist = await this._periodRepository.existByName(profile);

      if (!isExist) await this._periodRepository.createPeriodo(profile);
    });

    return true;
  }
}
