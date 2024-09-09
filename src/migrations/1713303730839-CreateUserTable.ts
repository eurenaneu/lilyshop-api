import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1713303730839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "cpf",
                        type: "char",
                        length: "11",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user", true);
    }

}
