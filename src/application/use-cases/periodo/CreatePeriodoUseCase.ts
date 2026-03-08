import { IPeriodoRepository } from "../../../domain/repositories/IPeriodoRepository";

export class CreatePeriodoUseCase {
  constructor(private _periodoRepository: IPeriodoRepository) {}

  async execute(): Promise<boolean> {
    const listProfile = ["manhã", "tarde", "noite"];

    listProfile.forEach(async (profile) => {
      const isExist = await this._periodoRepository.existByName(profile);

      if (!isExist) await this._periodoRepository.createPeriodo(profile);
    });

    return true;
  }
}
