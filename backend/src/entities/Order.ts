import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { User } from "./User"
@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", nullable: true })
    userId: string

    @Column({ type: "json", nullable: true }) 
    items: Record<string, any>;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    amount: number

    @Column({ type: "json", transformer:{
        to: (value: Record<string, any>) => JSON.stringify(value),
        from: (value: string) => {      
            try {
                return JSON.parse(value) || {};
            } catch (error) {
                return {};
            }
        }
    } })
    address: Record<string, any>;

    @Column({ type: "varchar", default: "Pending" })
    status: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", update: false })
    date: Date;

    @Column({ type: "boolean", default: false })
    payment: boolean

    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" }) 
    user: User;
}