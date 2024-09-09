import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartStatus {
    @PrimaryGeneratedColumn("increment", { name: "cart_status_id" })
    id: number;

    @Column({ name: "cart_status" })
    cartStatus: string;
}