import { HttpStatus } from "../utils/httpResponse";
import { BaseError } from "./base.error";

export class ProductNotFound extends BaseError {
  constructor(
    message = "Produto inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class ColorNotFound extends BaseError {
  constructor(
    message = "Cor inválida: Não encontrada",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
