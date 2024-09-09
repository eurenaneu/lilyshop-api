import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class State {
    @PrimaryColumn({ name: "state_id" })
    id: number;

    @Column()
    state: string;

    @Column({ length: 2 })
    acronym: string;
}