import { LoginDTO } from "../../../application/dtos/login.dto";
import { ProfileEntity } from "../entities/ProfilesEntity";
 import { SchoolEntity } from "../entities/SchoolEntity";
import { UserEntity } from "../entities/UserEntity";

export class LoginMapper {
    static toResponse(user: UserEntity, profile: ProfileEntity, school: SchoolEntity): LoginDTO {
        const response: LoginDTO = {
            escola: {
                name: school.name,
                uuid: school.uuid,
            },
            profile: {
                name: profile.name,
                uuid: profile.uuid,
            },
            user: {
                email: user.email,
                name: user.email,
                uuid: user.uuid,
            },
        };
        return response
    }
}