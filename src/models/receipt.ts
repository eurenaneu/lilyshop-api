import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order";
import { User } from "./user";
import { PaymentMethod } from "./paymentMethod";

@Entity()
@Check("total_price >= 0")
export class Receipt {
  @PrimaryGeneratedColumn("uuid", { name: "receipt_id" })
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod: PaymentMethod;

  @Column({ name: "total_price" })
  totalPrice: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
