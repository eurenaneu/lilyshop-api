import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateCartTable1722290072787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cart",
                columns: [
                    {
                        name: "cart_id",
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
                        name: "subtotal",
                        type: "numeric",
                        precision: 8,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "cart_status_id",
                        type: "integer",
                        default: 1,
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp without time zone",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
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

        const cartStatusForeignKey = new TableForeignKey({
            columnNames: ["cart_status_id"],
            referencedColumnNames: ["cart_status_id"],
            referencedTableName: "cart_status",
            onDelete: "CASCADE"
        })

        await queryRunner.createForeignKeys("cart", [
            userForeignKey, cartStatusForeignKey
        ]);

        await queryRunner.createCheckConstraint("cart", new TableCheck({
            columnNames: ["subtotal"],
            expression: "subtotal >= 0"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart", true);
    }

}
