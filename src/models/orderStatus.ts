import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus {
    @PrimaryGeneratedColumn("increment", { name: "order_status_id" })
    id: number;

    @Column({ name: "order_status" })
    orderStatus: string;
}