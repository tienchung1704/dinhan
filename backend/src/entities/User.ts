import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";


@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({
    type: "json",
    nullable: true,
    transformer: {
      to: (value: Record<string, number>) => JSON.stringify(value), // Chuyển object thành JSON khi lưu
      from: (value: string) => {
        try {
          return JSON.parse(value) || {};
        } catch (error) {
          return {};
        }
      }
    }
  })
  cartData: Record<string, number>;

  @Column({ type: "varchar", nullable: false })
  password: string;

}
