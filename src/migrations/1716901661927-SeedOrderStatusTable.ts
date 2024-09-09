import { MigrationInterface, QueryRunner } from "typeorm";
import { OrderStatus } from "../models/orderStatus";
import { OrderStatusEnum } from "../enum/orderStatus.enum";

export class SeedOrderStatusTable1716901661927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statusRepository = queryRunner.manager.getRepository(OrderStatus);

    for (const status in OrderStatusEnum) {
      await statusRepository.insert({ orderStatus: status });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(OrderStatus).clear();
  }
}
