import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Monster from "./Monster";

@Entity("worlds")
class World {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 100 })
  location: string;

  @Column({ length: 100 })
  pvp_type: string;

  @Column({ length: 100 })
  transfer_type: string;

  @ManyToMany(() => Monster, (monster) => monster.worlds)
  @JoinTable()
  monsters: Monster[];
}

export default World;
