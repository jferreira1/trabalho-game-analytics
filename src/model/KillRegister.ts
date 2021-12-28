import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Monster } from "./Monster";

@Entity()
export class KillRegister {
  @PrimaryColumn()
  id: number;

  @Column({ type: "int" })
  amount: number;

  @CreateDateColumn({ type: "date", unique: true })
  registered_at: Date;

  @ManyToOne(() => Monster)
  monster: Monster;
}
