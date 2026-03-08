import { StatusEnum } from "../../utils/enum/status";

export interface UserDTO {
  email: string;
  password: string;
  status: StatusEnum;
}

export interface UserResponseDTO {
  email: string;
}
