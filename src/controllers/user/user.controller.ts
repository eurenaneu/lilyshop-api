import { UserDTO } from "../../dto/user.dto";
import { User } from "../../models/user";
import { UserService } from "../../services/user/user.service";
import { HttpResponse, HttpStatus } from "../../utils/httpresponse";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAll(): Promise<HttpResponse<User[]>> {
    const users = await this.userService.getAll();

    return new HttpResponse(HttpStatus.OK, users);
  }

  async getUser(id: string): Promise<HttpResponse<User | null>> {
    try {
      const user = await this.userService.getUser(id);

      return new HttpResponse(HttpStatus.OK, user);
    } catch (error) {
      return new HttpResponse(HttpStatus.NOT_FOUND, null);
    }
  }

  async registerUser(userDTO: UserDTO): Promise<HttpResponse<User>> {
    const user: User = await this.userService.registerUser(userDTO);
    
    return new HttpResponse(HttpStatus.CREATED, user);
  }

  async patchUser(id: string, userDTO: UserDTO): Promise<HttpResponse<User | unknown>> {
    try {
      const user = await this.userService.patchUser(id, userDTO);

      return new HttpResponse(HttpStatus.OK, user);
    } catch (error) {
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async deleteUser(id: string): Promise<HttpResponse<User | unknown>> {
    try {
      const user = await this.userService.deleteUser(id);

      return new HttpResponse(HttpStatus.NO_CONTENT, user);
    } catch (error) {
      return new HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
