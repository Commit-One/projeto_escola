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
  class: {
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
  classUuid: string;
  dateMatriculation: Date;
  hasDiscount: boolean;
  discount: number;
  dayPayment: number;
  uuid: string;
  cpf: string;
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
  classUuid: string;
  profileUuid: string;
  cpf: string;
}

export interface StudentQuery {
  schoolName: string;
  schoolUuid: string;
  periodName: string;
  periodUuid: string;
  profileName: string;
  profileUuid: string;
  className: string;
  name: string;
  matriculation: string;
  dateBirth: Date;
  status: StatusEnum;
  nameMother: string;
  nameFather: string;
  phone: string;
  classUuid: string;
  dateMatriculation: Date;
  hasDiscount: boolean;
  discount: number;
  dayPayment: number;
  uuid: string;
  cpf: string;
}
