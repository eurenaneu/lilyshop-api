import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from "typeorm";

export class CreateProductTable1713303750234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    {
                        name: "product_id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "color_id",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "unit_price",
                        type: "numeric",
                        precision: 5,
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

        const foreignKey = new TableForeignKey({
            columnNames: ["color_id"],
            referencedColumnNames: ["color_id"],
            referencedTableName: "color",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKey("product", foreignKey);
        await queryRunner.createCheckConstraint("product", new TableCheck({
            columnNames: ["unit_price"],
            expression: "unit_price >= 0"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product", true)
    }

}
