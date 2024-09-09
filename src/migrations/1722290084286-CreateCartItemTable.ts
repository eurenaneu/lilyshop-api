import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateCartItemTable1722290084286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart_item",
                columns: [
                    {
                        name: "cart_item_id",
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
                        name: "cart_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "unit_price",
                        type: "decimal",
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

        const cartForeignKey = new TableForeignKey({
            columnNames: ["cart_id"],
            referencedColumnNames: ["cart_id"],
            referencedTableName: "cart",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKeys("cart_item", [
            productForeignKey, cartForeignKey
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

        await queryRunner.createCheckConstraints("cart_item", [
            checkUnitPrice, checkQuantity, checkSubtotal
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart_item", true);
    }

}
