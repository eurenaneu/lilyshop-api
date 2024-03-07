import dataSource from "../../database/datasource";
import { User } from "../../models/user";

export const UserRepository = dataSource.getRepository(User);
