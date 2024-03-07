export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse<T> {
  constructor(
    public statusCode: HttpStatus,
    public body: T
  ) {}
}
