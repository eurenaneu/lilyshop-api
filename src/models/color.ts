import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Color {
    @PrimaryGeneratedColumn("increment", { name: "color_id" })
    id: number;

    @Column()
    color: string;
}