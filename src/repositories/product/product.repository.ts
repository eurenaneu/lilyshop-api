import dataSource from "../../database/datasource";
import { Product } from "../../models/product";

export const ProductRepository = dataSource.getRepository(Product);