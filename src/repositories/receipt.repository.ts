import dataSource from "../database/datasource";
import { Receipt } from "../models/receipt";

export const receiptRepository = dataSource.getRepository(Receipt);