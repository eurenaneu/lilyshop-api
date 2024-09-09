import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { City } from "./city";
import { State } from "./state";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("uuid", { name: "address_id" })
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ length: 8 })
    cep: string;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column()
    complement: string;

    @Column()
    district: string;

    @ManyToOne(() => City)
    @JoinColumn({ name: "city_id" })
    city: City;

    @ManyToOne(() => State)
    @JoinColumn({ name: "state_id" })
    state: State;
}