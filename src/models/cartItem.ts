import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { Cart } from "./cart";

@Entity()
@Check("unit_price >= 0")
@Check("quantity > 0")
@Check("subtotal >= 0")
export class CartItem {
    @PrimaryGeneratedColumn("uuid", { name: "cart_item_id" })
    id: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: "cart_id" })
    cart: Cart;

    @Column({ name: "unit_price" })
    unitPrice: number;

    @Column()
    quantity: number;

    @Column()
    subtotal: number;
}