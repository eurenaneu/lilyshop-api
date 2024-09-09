import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAddressTable1715345515511 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "address",
                columns: [
                    {
                        name: "address_id",
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
                        name: "cep",
                        type: "char",
                        length: "8",
                        isNullable: false
                    },
                    {
                        name: "street",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "number",
                        type: "integer",
                        isNullable: true
                    },
                    {
                        name: "complement",
                        type: "varchar",
                        length: "150",
                        isNullable: true
                    },
                    {
                        name: "district",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "city_id",
                        type: "integer",
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

        const userForeignKey = new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["user_id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        });

        const cityForeignKey = new TableForeignKey({
            columnNames: ["city_id"],
            referencedColumnNames: ["city_id"],
            referencedTableName: "city",
            onDelete: "CASCADE"
        });

        const stateForeignKey = new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["state_id"],
            referencedTableName: "state",
            onDelete: "CASCADE"
        });

        await queryRunner.createForeignKeys("address", [
            userForeignKey, cityForeignKey, stateForeignKey
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address", true);
    }

}
