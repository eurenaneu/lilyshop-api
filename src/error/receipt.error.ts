import { HttpStatus } from "../utils/httpResponse";
import { BaseError } from "./base.error";

export class ReceiptNotFound extends BaseError {
  constructor(
    message = "Nota fiscal inválida: Não encontrada",
    statusCode = HttpStatus.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
