import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { State } from "./state";

@Entity()
export class City {
    @PrimaryColumn({ name: "city_id" })
    id: number;

    @Column()
    city: string;

    @ManyToOne(() => State)
    @JoinColumn({ name: "state_id" })
    state: State;
}