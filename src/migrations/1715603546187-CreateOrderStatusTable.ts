import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderStatusTable1715603546187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order_status",
                columns: [
                    {
                        name: "order_status_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "order_status",
                        type: "varchar",
                        length: "25",
                        isNullable: false
                    }
                ]
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order_status", true);
    }

}
