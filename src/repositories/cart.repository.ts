import dataSource from "../database/datasource";
import { Cart } from "../models/cart";

export const cartRepository = dataSource.getRepository(Cart);