import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
@Check("unit_price >= 0")
@Check("quantity > 0")
@Check("subtotal >= 0")
export class OrderItem {
    @PrimaryGeneratedColumn("uuid", { name: "order_item_id" })
    id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => Order)
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Column({ name: "unit_price" })
    unitPrice: number;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;
}