import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterProductTable1715225230896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "product",
            "unit_price",
            new TableColumn({
                name: "unit_price",
                type: "numeric",
                precision: 8,
                scale: 2,
                isNullable: false
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "product",
            "unit_price",
            new TableColumn({
                name: "unit_price",
                type: "numeric",
                precision: 5,
                scale: 2,
                isNullable: false
            })
        );
    }

}
