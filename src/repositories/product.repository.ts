import dataSource from "../database/datasource";
import { Product } from "../models/product";

export const productRepository = dataSource.getRepository(Product);