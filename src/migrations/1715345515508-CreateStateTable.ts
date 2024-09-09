import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStateTable1715345515508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "state",
                columns: [
                    {
                        name: "state_id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: false,
                        length: "50"
                    },
                    {
                        name: "acronym",
                        type: "char",
                        isNullable: false,
                        length: "2"
                    }
                ]
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("state", true);
    }

}
