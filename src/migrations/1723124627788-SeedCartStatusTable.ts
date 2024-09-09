import { MigrationInterface, QueryRunner } from "typeorm";
import { CartStatus } from "../models/cartStatus";
import { CartStatusEnum } from "../enum/cartStatus.enum";

export class SeedCartStatusTable1723124627788 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const statusRepository = queryRunner.manager.getRepository(CartStatus);
    
        for (const status in CartStatusEnum) {
          await statusRepository.insert({ cartStatus: status });
        }
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(CartStatus).clear();
      }
}
