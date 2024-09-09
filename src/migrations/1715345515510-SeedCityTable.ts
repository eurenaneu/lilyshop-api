import { MigrationInterface, QueryRunner } from "typeorm";
import axios from "axios";
import { City } from "../models/city";
import { State } from "../models/state";
import { CityDataDTO, CityDataSchema } from "../interface/ibgeData";

export class SeedCityTable1715345515510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const cityRepository = queryRunner.manager.getRepository(City);
        const stateRepository = queryRunner.manager.getRepository(State);
        
        const citiesList = (await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado&orderBy=id")).data;

        await Promise.all(citiesList.map(async (city: CityDataDTO) => {
            const state = await stateRepository.findOneBy({ id: city["UF-id"] });
            
            if (state) {
                const cityData = CityDataSchema.parse(city);
                await cityRepository.insert({ id: cityData["municipio-id"], state, city: city["municipio-nome"] });
            }
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(City).clear();
    }

}
