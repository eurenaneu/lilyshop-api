import dataSource from "../database/datasource";
import { OrderStatus } from "../models/orderStatus";

export const orderStatusRepository = dataSource.getRepository(OrderStatus);
