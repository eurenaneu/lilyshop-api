import { Repository } from "typeorm";
import { User } from "../models/user";
import { UserDTO } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import { CpfAlreadyExists, EmailAlreadyExists, UserNotFound } from "../error/user.error";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }

  async getUserAddresses(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ["addresses", "addresses.city", "addresses.state"]
    });
  }

  async createUser(userData: UserDTO): Promise<User> {
    // verificar se já existe um usuário com este email ou cpf cadastrado
    const existentUser = await this.userRepository.findOne({ where: [
      { email: userData.email },
      { cpf: userData.cpf }
    ]});

    if (existentUser?.cpf == userData.cpf) {
      throw new CpfAlreadyExists();
    }

    if (existentUser?.email == userData.email) {
      throw new EmailAlreadyExists();
    }

    // criptografar senha
    const hashedPassword = bcrypt.hashSync(userData.password, await bcrypt.genSalt(10));
    userData.password = hashedPassword;
    
    const user = this.userRepository.create(userData);

    return await this.userRepository.save(user);
  }

  async patchUser(userId: string, userData: UserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFound;
    }

    return await this.userRepository.save({ id: userId, ...userData });
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFound();
    }

    return await this.userRepository.remove(user);
  }
}
