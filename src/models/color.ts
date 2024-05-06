import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Color {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column("color")
    colorName: string;

    constructor(colorName: string) {
        this.colorName = colorName;
    }
}