import dataSource from "../database/datasource";
import { User } from "../models/user";

export const userRepository = dataSource.getRepository(User);