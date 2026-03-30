import { Profile } from "../../../domain/entities/Profile";
import { ProfileEntity } from "../entities/ProfilesEntity";

export class ProfileMapper {
  static toDomain(entity: ProfileEntity): Profile {
    return new Profile(entity.name, {
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      enable: entity.enable,
    });
  }

  static toEntity(entity: Profile): ProfileEntity {
    const profileEntity = new ProfileEntity();

    profileEntity.name = entity.name;

    return profileEntity;
  }
}
