import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.email,
      entity.password,
      entity.schoolUuid,
      entity.profileUuid,
      entity.name,
      entity.status,
      entity.last_access,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
      },
    );
  }

  static toResponse(entity: UserEntity): {
    email: string;
    status: string;
    uuid: string;
  } {
    return {
      email: entity.email,
      status: entity.status,
      uuid: entity.uuid,
    };
  }
}
