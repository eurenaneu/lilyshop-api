import { MigrationInterface, QueryRunner } from "typeorm";
import { Color } from "../models/color";
import { ColorEnum } from "../enum/color.enum";

export class SeedColorTable1716900515986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const colorRepository = queryRunner.manager.getRepository(Color);

        for (const color in ColorEnum) {
            await colorRepository.insert({ color: color });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(Color).clear();
    }

}
