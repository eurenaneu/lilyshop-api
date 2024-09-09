import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateOrderItemTable1715651186242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order_item",
                columns: [
                    {
                        name: "order_item_id",
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
                        name: "order_id",
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
                        precision: 8,
                        scale: 2,
                        isNullable: false
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

        const orderForeignKey = new TableForeignKey({
            columnNames: ["order_id"],
            referencedColumnNames: ["order_id"],
            referencedTableName: "order",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKeys("order_item", [
            productForeignKey, orderForeignKey
        ]);

        const checkUnitPrice = new TableCheck({
            columnNames: ["unit_price"],
            expression: "unit_price >= 0"
        });

        const checkQuantity = new TableCheck({
            columnNames: ["quantity"],
            expression: "quantity > 0"
        });
        
        const checkSubtotal = new TableCheck({
            columnNames: ["subtotal"],
            expression: "subtotal >= 0"
        });

        await queryRunner.createCheckConstraints("order_item", [
            checkUnitPrice, checkQuantity, checkSubtotal
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order_item", true);
    }

}
