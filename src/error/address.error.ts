import { HttpStatus } from "../utils/httpResponse";
import { BaseError } from "./base.error";

// AddressNotFound/AddressDoesntExists
export class AddressNotFound extends BaseError {
  constructor(
    message = "Endereço inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

// InvalidCep
export class InvalidCep extends BaseError {
  constructor(
    message = "CEP inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

// InvalidCepSize
export class InvalidCepSize extends BaseError {
  constructor(
    message = "CEP inválido: Tamanho de CEP inválido",
    statusCode = HttpStatus.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

// ViacepApiError
export class ViacepApiError extends BaseError {
  constructor(
    message = "Erro na API ViaCEP: CEP não encontrado",
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

// StateNotFound
export class StateNotFound extends BaseError {
  constructor(
    message = "Estado inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

// CityNotFound
export class CityNotFound extends BaseError {
  constructor(
    message = "Cidade inválida: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
