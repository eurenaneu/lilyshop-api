import dataSource from "../database/datasource";
import { Address } from "../models/address";

export const addressRepository = dataSource.getRepository(Address);