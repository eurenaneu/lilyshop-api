import { EntityManager, Repository } from "typeorm";
import { Address } from "../models/address";
import dataSource from "../database/datasource";
import { City } from "../models/city";
import { State } from "../models/state";
import axios from "axios";
import { AddressNotFound, InvalidCepSize, StateNotFound, ViacepApiError } from "../error/address.error";
import { ViaCepSchema } from "../interface/viaCepData";
import { AddressDTO, AddressSchema } from "../schemas/address.schema";

export class AddressService {
    constructor(
        private readonly addressRepository: Repository<Address>
    ) {}

    async getAll(): Promise<Address[]> {
        return await this.addressRepository.find({ relations: ["user", "city", "state"] });
    }

    async getAddress(addressId: string): Promise<Address | null> {
        const address = await this.addressRepository.findOne({
            where: { id: addressId },
            relations: ["user", "city", "state"]
        });

        if (!address) {
            throw new AddressNotFound();
        }

        return address;
    }

    async createAddress(addressData: AddressDTO): Promise<Address> {
        if (addressData.cep.length != 8) {
            throw new InvalidCepSize();
        }

        const address = this.addressRepository.create(AddressSchema.parse(addressData));

        return await this.addressRepository.save(address);
    }

    async patchAddress(addressId: string, addressData: AddressDTO): Promise<Address> {
        return await dataSource.transaction(async (transactionalEntityManager: EntityManager) => {
            const address = await transactionalEntityManager.findOne(Address, {
                where: { id: addressId },
                relations: ["user", "city", "state"]
            });

            if (!address) {
                throw new AddressNotFound();
            }

            if (addressData.cep != address.cep) {
                const viacepAddress = ViaCepSchema.parse((await axios.get("https://viacep.com.br/ws/" + addressData.cep + "/json/")).data);
                
                const viacepCity = await transactionalEntityManager.findOne(City, {
                    where: { id: Number(viacepAddress.ibge) },
                    relations: ["state"]
                });
                
                if (!viacepCity) {
                    throw new ViacepApiError();
                }

                const viacepState = await transactionalEntityManager.findOneBy(State, { id: viacepCity.state.id });

                if (!viacepState) {
                    throw new StateNotFound();
                }

                address.cep = addressData.cep;
                address.city = viacepCity;
                address.state = viacepState;
            }

            address.number = addressData.number || address.number;
            address.complement = addressData.complement || address.complement;

            return await transactionalEntityManager.save(Address, address);
        });
    }

    async deleteAddress(addressId: string): Promise<Address> {
        const address = await this.addressRepository.findOneBy({ id: addressId });

        if (!address) {
            throw new AddressNotFound();
        }

        return await this.addressRepository.remove(address);
    }
}