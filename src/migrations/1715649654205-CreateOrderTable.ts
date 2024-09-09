import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateOrderTable1715649654205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order",
                columns: [
                    {
                        name: "order_id",
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
                        name: "address_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "order_status_id",
                        type: "integer",
                        default: 1,
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

        const addressForeignKey = new TableForeignKey({
            columnNames: ["address_id"],
            referencedColumnNames: ["address_id"],
            referencedTableName: "address",
            onDelete: "CASCADE"
        });

        const orderStatusForeignKey = new TableForeignKey({
            columnNames: ["order_status_id"],
            referencedColumnNames: ["order_status_id"],
            referencedTableName: "order_status",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKeys("order", [
            userForeignKey,
            addressForeignKey,
            orderStatusForeignKey
        ]);

        await queryRunner.createCheckConstraint("order", new TableCheck({
            columnNames: ["total_price"],
            expression: "total_price >= 0"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order", true);
    }

}
