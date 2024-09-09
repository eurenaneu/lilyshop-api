import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateColorTable1713295786662 implements MigrationInterface {
    name = 'CreateColorTable1713295786662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "color",
                columns: [
                    {
                        name: "color_id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "color",
                        type: "varchar",
                        length: "20"
                    }
                ]
            }), true
        );        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("color", true);
    }

}
