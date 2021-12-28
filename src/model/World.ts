import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from "typeorm";
import { Monster } from "../model/Monster";

@Entity()
export class World {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 100 })
  location: string;

  @Column({ length: 100 })
  pvp_type: string;

  @Column({ length: 100 })
  transfer_type: string;

  @ManyToMany(() => Monster)
  @JoinTable()
  monsters: Monster[];
}
