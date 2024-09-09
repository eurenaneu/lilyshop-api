import { UserDTO } from "../schemas/user.schema";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { HttpResponse, HttpStatus } from "../utils/httpResponse";
import { BaseError } from "../error/base.error";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAll(): Promise<HttpResponse<User[]>> {
    const users = await this.userService.getAll();

    if (users.length === 0) {
      return new HttpResponse(HttpStatus.NO_CONTENT, users);
    }

    return new HttpResponse(HttpStatus.OK, users);
  }

  async getUser(id: string): Promise<HttpResponse<User | unknown>> {
    try {
      const user = await this.userService.getUser(id);

      return new HttpResponse(HttpStatus.OK, user);
    } catch (error) {
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async getUserAddresses(
    userId: string
  ): Promise<HttpResponse<User | null>> {
    const userAddresses = await this.userService.getUserAddresses(userId);

    return new HttpResponse(HttpStatus.OK, userAddresses);
  }

  async createUser(userDTO: UserDTO): Promise<HttpResponse<User | unknown>> {
    try {
      const user = await this.userService.createUser(userDTO);

      return new HttpResponse(HttpStatus.CREATED, user);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async patchUser(
    id: string,
    userDTO: UserDTO
  ): Promise<HttpResponse<User | unknown>> {
    try {
      const user = await this.userService.patchUser(id, userDTO);

      return new HttpResponse(HttpStatus.OK, user);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(error.statusCode, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async deleteUser(id: string): Promise<HttpResponse<User | unknown>> {
    try {
      const user = await this.userService.deleteUser(id);

      return new HttpResponse(HttpStatus.OK, user);
    } catch (error) {
      if (error instanceof BaseError) {
        return new HttpResponse(HttpStatus.NO_CONTENT, error.message);
      }
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
