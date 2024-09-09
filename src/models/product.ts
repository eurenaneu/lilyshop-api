import { Check, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "./color";
import { Category } from "./category";

@Entity()
@Check("unit_price >= 0")
export class Product {
  @PrimaryGeneratedColumn("uuid", { name: "product_id" })
  id: string;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ name: "unit_price" })
  unitPrice: number;
  
  @ManyToOne(() => Color)
  @JoinColumn({ name: "color_id" })
  color: Color;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
  
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
