import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class KillRegister {
  @PrimaryColumn()
  id: number;

  @Column({ type: "int" })
  amount: number;

  @CreateDateColumn({ type: "date", unique: true })
  registered_at: Date;
}
