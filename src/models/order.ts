import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address";
import { OrderStatus } from "./orderStatus";
import { User } from "./user";
import { PaymentMethod } from "./paymentMethod";

@Entity()
@Check("total_price >= 0")
export class Order {
  @PrimaryGeneratedColumn("uuid", { name: "order_id" })
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: "order_status_id" })
  orderStatus: OrderStatus;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: "payment_method_id" })
  paymentMethod: PaymentMethod;

  @Column({ name: "total_price" })
  totalPrice: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
