import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("increment", { name: "category_id" })
    id: string;

    @Column()
    category: string;
}