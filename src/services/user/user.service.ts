import { Repository } from "typeorm";
import { User } from "../../models/user";
import { UserDTO } from "../../dto/user.dto";

export class UserService {
  constructor(private readonly UserRepository: Repository<User>) {}

  async getAll(): Promise<User[]> {
    return await this.UserRepository.find();
  }

  async getUser(id: string): Promise<User | null> {
    return await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async registerUser(userDTO: UserDTO): Promise<User> {
    const user: User = this.UserRepository.create(userDTO);

    return await this.UserRepository.save(user);
  }

  async patchUser(id: string, userDTO: UserDTO): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    Object.assign(user, userDTO);

    return await this.UserRepository.save(user);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    await this.UserRepository.remove(user);

    return user;
  }
}
