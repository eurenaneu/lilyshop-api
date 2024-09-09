import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCartStatusTable1722290065885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart_status",
                columns: [
                    {
                        name: "cart_status_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "cart_status",
                        type: "varchar",
                        length: "25",
                        isNullable: false
                    }
                ]
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart_status", true);
    }

}
