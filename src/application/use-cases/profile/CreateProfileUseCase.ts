import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";

export class CreateProfileUseCase {
  constructor(private _profileRepository: IProfileRepository) {}

  async execute(): Promise<boolean> {
    const listProfile = ["admin", "teacher", "student"];

    listProfile.forEach(async (profile) => {
      const isExist = await this._profileRepository.existByName(profile);

      if (!isExist) await this._profileRepository.createProfile(profile);
    });

    return true;
  }
}
