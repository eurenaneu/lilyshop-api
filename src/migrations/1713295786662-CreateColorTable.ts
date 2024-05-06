import { MigrationInterface, QueryRunner, Table } from "typeorm";
import dataSource from "../database/datasource";
import { Color } from "../models/color";
import { ColorName } from "../enum/color.enum";

export class CreateColorTable1713295786662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Colors",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "color",
                        type: "varchar"
                    }
                ]
            }), true
        );

        const queryBuilder = await dataSource.createQueryBuilder();
        
        queryBuilder.insert().into(Color)
                    .values([
                        { colorName: ColorName.AMARELO },
                        { colorName: ColorName.AZUL },
                        { colorName: ColorName.BRANCO },
                        { colorName: ColorName.LARANJA },
                        { colorName: ColorName.ROSA },
                        { colorName: ColorName.ROXO },
                        { colorName: ColorName.COLORIDA }
                    ]);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Colors", true);
    }

}
