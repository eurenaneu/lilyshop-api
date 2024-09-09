import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateReceiptItemTable1715655875714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "receipt_item",
                columns: [
                    {
                        name: "receipt_item_id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "receipt_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "unit_price",
                        type: "numeric",
                        precision: 8,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "quantity",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "subtotal",
                        type: "numeric",
                        isNullable: false,
                        precision: 8,
                        scale: 2
                    }
                ]
            }), true
        );

        const productForeignKey = new TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["product_id"],
            referencedTableName: "product",
            onDelete: "CASCADE"
        });

        const receiptForeignKey = new TableForeignKey({
            columnNames: ["receipt_id"],
            referencedColumnNames: ["receipt_id"],
            referencedTableName: "receipt",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKeys("receipt_item", [
            productForeignKey, receiptForeignKey
        ]);

        const checkUnitPrice = new TableCheck({
            columnNames: ["unit_price"],
            expression: "unit_price >= 0"
        });

        const checkQuantity = new TableCheck({
            columnNames: ["quantity"],
            expression: "quantity > 0"
        })
        const checkSubtotal = new TableCheck({
            columnNames: ["subtotal"],
            expression: "subtotal >= 0"
        });

        await queryRunner.createCheckConstraints("receipt_item", [
            checkUnitPrice, checkQuantity, checkSubtotal
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("receipt_item", true);
    }

}
