import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.email,
      "_",
      entity.schoolUuid,
      entity.profileUuid,
      entity.name,
      entity.status,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
      },
    );
  }

  static toResponse(entity: UserEntity): { email: string; status: string } {
    return {
      email: entity.email,
      status: entity.status,
    };
  }
}
