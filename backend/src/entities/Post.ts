import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "post" })
export class Post {
    @PrimaryGeneratedColumn("uuid") // Sử dụng UUID thay cho ObjectId của MongoDB
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "varchar", nullable: false })
    image: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "text", nullable: false })
    detail: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", update: false })
    date: Date;

}