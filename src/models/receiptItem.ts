import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { Receipt } from "./receipt";

@Entity()
@Check("unit_price >= 0")
@Check("quantity > 0")
@Check("subtotal >= 0")
export class ReceiptItem {
    @PrimaryGeneratedColumn("uuid", { name: "receipt_item_id" })
    id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => Receipt)
    @JoinColumn({ name: "receipt_id" })
    receipt: Receipt;

    @Column({ name: "unit_price" })
    unitPrice: number;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;
}