import axios from "axios";
import { MigrationInterface, QueryRunner } from "typeorm";
import { State } from "../models/state";
import { StateDataDTO, StateDataSchema } from "../interface/ibgeData";

export class SeedStateTable1715345515509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const stateRepository = queryRunner.manager.getRepository(State);

        const statesList = (await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=id")).data;

        await Promise.all(statesList.map(async (state: StateDataDTO) => {
            await stateRepository.insert(StateDataSchema.parse(state));
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(State).clear();
    }

}
