import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";

@Entity("user_token")
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Generated("uuid")
  @Column()
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
