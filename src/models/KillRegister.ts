import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import Monster from "./Monster";
import World from "./World";

@Unique(["registered_at", "world", "monster"])
@Entity("kill_registers")
class KillRegister {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  amount: number;

  @CreateDateColumn({ type: "timestamp" })
  registered_at: Date;

  @ManyToOne(() => Monster)
  monster: Monster;

  @OneToOne(() => World)
  @JoinColumn()
  world: World;
}

export default KillRegister;
