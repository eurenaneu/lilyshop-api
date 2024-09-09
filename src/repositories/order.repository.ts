import dataSource from "../database/datasource";
import { Order } from "../models/order";

export const orderRepository = dataSource.getRepository(Order);