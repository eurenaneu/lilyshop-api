import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaymentMethodTable1715277891079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payment_method",
                columns: [
                    {
                        name: "payment_method_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "payment_method",
                        type: "varchar",
                        length: "25",
                        isUnique: true,
                        isNullable: false
                    }
                ]
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_method");
    }

}
