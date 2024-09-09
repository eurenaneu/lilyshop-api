import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateReceiptTable1715654451426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "receipt",
                columns: [
                    {
                        name: "receipt_id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "order_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "payment_method_id",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "total_price",
                        type: "numeric",
                        precision: 8,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp without time zone",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }), true
        );

        const userForeignKey = new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["user_id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        });

        const orderForeignKey = new TableForeignKey({
            columnNames: ["order_id"],
            referencedColumnNames: ["order_id"],
            referencedTableName: "order",
            onDelete: "CASCADE"
        });

        const paymentMethodForeignKey = new TableForeignKey({
            columnNames: ["payment_method_id"],
            referencedColumnNames: ["payment_method_id"],
            referencedTableName: "payment_method",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKeys("receipt", [
            userForeignKey, orderForeignKey, paymentMethodForeignKey
        ]);

        await queryRunner.createCheckConstraint("receipt", new TableCheck({
            columnNames: ["total_price"],
            expression: "total_price >= 0"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("receipt", true);
    }

}
