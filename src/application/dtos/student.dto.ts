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
  datePayment: Date;
  uuid: string;
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
  datePayment: Date;
  schoolUuid: string;
  periodUuid: string;
  classStudentUuid: string
}
