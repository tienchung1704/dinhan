import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "product" })
export class Product {
    @PrimaryGeneratedColumn("uuid") // Sử dụng UUID thay cho ObjectId của MongoDB
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: "varchar", nullable: false })
    image: string;

    @Column({type: "int",nullable: true, default: 0})
    quantity: number;

    @Column({ type: "tinyint", width: 1 })
    isTrending: boolean; 

    @Column({ type: "varchar", nullable: false })
    category: string;
}