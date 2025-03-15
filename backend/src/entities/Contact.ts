import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "contact" })
export class Contact {
    @PrimaryGeneratedColumn("uuid") // Sử dụng UUID thay cho ObjectId của MongoDB
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    firstname: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    lastname: string;


    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: "text" ,  nullable: false })
    phone: string;

    @Column({ type: "text", nullable: false })
    detail: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", update: false })
    date: Date;

}