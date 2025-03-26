import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from "typeorm"
import { User } from "./User"
@Entity({ name: "cart" })
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "json",
        nullable: true,
        transformer: {
          to: (value: Record<string, number>) => JSON.stringify(value), 
          from: (value: string) => {
            try {
              return JSON.parse(value) || {};
            } catch (error) {
              return {};
            }
          },
        },
      })
      cartData: Record<string, number>;

    @ManyToOne(() => User, (user) => user.carts, { onDelete: "CASCADE" }) 
    user: User;
}