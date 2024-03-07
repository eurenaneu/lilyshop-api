import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id?: string;

  @Column({name: "first_name"})
  firstName: string;

  @Column({name: "last_name"})
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name: "created_at"})
  createdAt?: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }
}
