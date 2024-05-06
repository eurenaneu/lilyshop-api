import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "./color";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinColumn()
  color: Color;

  @Column()
  price: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  constructor(name: string, description: string, color: Color, price: number) {
    this.name = name;
    this.color = color;
    this.description = description;
    this.price = price;
  }
}
