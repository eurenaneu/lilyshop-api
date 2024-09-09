import { HttpStatus } from "../utils/httpResponse";
import { BaseError } from "./base.error";

// OrderNotFound/OrderDoesntExists
export class OrderNotFound extends BaseError {
  constructor(
    message = "Pedido inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class OrderStatusNotFound extends BaseError {
  constructor(
    message = "Status do pedido inválido: Não encontrado",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
