import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
@Entity({ name: "useradmin" })
export class UserAdmin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true})
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({type: "varchar", default: "user"})
  role: string;
}
