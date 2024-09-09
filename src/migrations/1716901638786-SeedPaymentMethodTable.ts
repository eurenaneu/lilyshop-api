import { MigrationInterface, QueryRunner } from "typeorm";
import { PaymentMethodEnum } from "../enum/paymentMethod.enum";
import { PaymentMethod } from "../models/paymentMethod";

export class SeedPaymentMethodTable1716901638786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const paymentMethodRepository =
      queryRunner.manager.getRepository(PaymentMethod);

    for (const method in PaymentMethodEnum) {
      await paymentMethodRepository.insert({ paymentMethod: method });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(PaymentMethod).clear();
  }
}
