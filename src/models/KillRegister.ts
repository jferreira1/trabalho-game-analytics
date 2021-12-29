import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import Monster from "./Monster";

@Entity("kill_registers")
class KillRegister {
  @PrimaryColumn()
  id: number;

  @Column({ type: "int" })
  amount: number;

  @CreateDateColumn({ type: "date", unique: true })
  registered_at: Date;

  @ManyToOne(() => Monster)
  monster: Monster;
}

export default KillRegister;
