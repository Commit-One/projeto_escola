import { StatusEnum } from "../../utils/enum/status";

export interface StudentResponseDTO {
  escola: {
    name: string;
    uuid: string;
  };
  periodo: {
    name: string;
    uuid: string;
  };
  profile: {
    name: string;
    uuid: string;
  };
  name: string;
  matriculation: string;
  dateBirth: Date;
  status: StatusEnum;
  nameMother: string;
  nameFather: string;
  phone: string;
  classStudent: string;
  dateMatriculation: Date;
  hasDiscount: boolean;
  discount: number;
  dayPayment: number;
  uuid: string;
  id: number;
}

export interface StudentDTO {
  name: string;
  matriculation: string;
  dateBirth: Date;
  status: StatusEnum;
  nameMother: string;
  nameFather: string;
  phone: string;
  dateMatriculation: Date;
  hasDiscount: boolean;
  discount: number;
  dayPayment: number;
  schoolUuid: string;
  periodUuid: string;
  classStudentUuid: string;
  profileUuid: string;
}
