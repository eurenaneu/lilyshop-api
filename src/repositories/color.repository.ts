import dataSource from "../database/datasource";
import { Color } from "../models/color";

export const colorRepository = dataSource.getRepository(Color);