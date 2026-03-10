export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Requisição inválida") {
    super(message, 400);
  }
}

export const ApplicationError = {
  generic: {
    default: "Ocorreu um erro ao realizar a ação",
    uuid: "Uuid não encontrado",
    formatEmail: "E-mail inválido",
    tokenInvalid: "Token inválido",
    tokenNotFound: "Token não encontrado",
    updateStatus: "Status não informado ou com erro",
    notFound: "Registro não encontrado",
  },
  school: {
    nameSchoolRequired: "Nome da escola é obrigatório",
    emailRequired: "E-mail da escola não informado",
    addressRequired: "Endereço da escola não informado",
    phoneRequired: "Telefone da escola não informado",
    nameDirectorRequired: "Nome do diretor da escola não informado",
    notFound: "Escola não encontrada",
  },
  user: {
    passwordCompare: "Senha inválida",
    // alias para compatibilidade com código existente
    passawordCompare: "Senha inválida",
    emailRequired: "E-mail do usuário não informado",
    passwordRequired: "Senha do usuário não informado",
    notFound: "Usuário não encontrado",
    updatePassword: "Não foi possível atualizar senha",
  },
  profile: {
    nameRequired: "Nome do perfil não informado",
    profileNotFound: "Perfil não informado",
    notFound: "Perfil de estudante não encontrado",
  },
  student: {
    nameRequired: "O nome do aluno não informado",
    matriculationRequired: "A matrícula é obrigatória",
    dateBirthRequired: "A data de nascimento é obrigatória",
    statusRequired: "O stutus não foi informado",
    nameMotherRequired: "Nome da mãe não informado",
    nameFatherRequired: "Nome do pai não informado",
    phoneRequired: "Telefone não informado",
    classStudentRequired: "Turma não informado",
    dateMatriculationRequired: "Data da matricula não informada",
    datePaymentRequired: "Data do pagamento não informada",
    schoolUuidRequired: "EscolaUuid não informada",
    periodUuidRequired: "Período não informado",
    notFound: "Estudante não encontrado",
  },
  period: {
    notFound: "Período não encontrado",
  },
  class: {
    nameRequired: "O nome da classe não informado",
    maxAgeRequired: "Idade máxima não preenchida",
    minAgeRequired: "Idade mínima não preenchida",
  },
};
