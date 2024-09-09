import { HttpStatus } from "../utils/httpResponse";
import { BaseError } from "./base.error";

// CpfAlreadyExists
export class CpfAlreadyExists extends BaseError {
  constructor(
    message = "CPF inválido: Já está cadastrado no sistema",
    statusCode = HttpStatus.CONFLICT
  ) {
    super(message, statusCode);
  }
}

// EmailAlreadyExists
export class EmailAlreadyExists extends BaseError {
  constructor(
    message = "Endereço de e-mail inválido: Já está cadastrado no sistema",
    statusCode = HttpStatus.CONFLICT
  ) {
    super(message, statusCode);
  }
}

// UserNotFound/UserDoesntExists
export class UserNotFound extends BaseError {
  constructor(
    message = "Usuário inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
