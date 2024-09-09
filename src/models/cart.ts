import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { CartStatus } from "./cartStatus";

@Entity()
@Check("subtotal >= 0")
export class Cart {
    @PrimaryGeneratedColumn("uuid", { name: "cart_id" })
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    subtotal: number;
    
    @ManyToOne(() => CartStatus)
    @JoinColumn({ name: "cart_status_id" })
    cartStatus: CartStatus

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}