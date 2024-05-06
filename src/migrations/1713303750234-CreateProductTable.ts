import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductTable1713303750234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "color_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "price",
                        type: "numeric(5,2)",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp without timezone",
                        isNullable: false
                    }
                ]
            })
        )

        const foreignKey = new TableForeignKey({
            columnNames: ["color_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Colors",
            onDelete: "CASCADE"
        })

        await queryRunner.createForeignKey("Products", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Products", true)
    }

}
