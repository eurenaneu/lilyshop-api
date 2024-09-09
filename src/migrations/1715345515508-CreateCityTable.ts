import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCityTable1715345515508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "city",
                columns: [
                    {
                        name: "city_id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "city",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "state_id",
                        type: "integer",
                        isNullable: false
                    }
                ]
            }), true
        );

        const foreignKey = new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["state_id"],
            referencedTableName: "state",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKey("city", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("state", true);
    }

}
