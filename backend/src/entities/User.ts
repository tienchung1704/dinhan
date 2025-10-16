import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Cart } from "./Cart";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @Column({ type: "varchar", nullable: false })
  password: string;
  @Column({ type: "float", default: 0})
  giamGia: Number;
}
