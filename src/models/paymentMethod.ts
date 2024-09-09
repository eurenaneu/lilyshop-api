import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn("increment", { name: "payment_method_id" })
    id: number;

    @Column({ name: "payment_method" })
    paymentMethod: string;
}