import { HttpStatus } from "../utils/httpResponse";
import { BaseError } from "./base.error";

// CartNotFound/CartDoesntExists
export class CartNotFound extends BaseError {
  constructor(
    message = "Carrinho inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class CartStatusNotFound extends BaseError {
  constructor(
    message = "Status do carrinho inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
