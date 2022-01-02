import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import World from "./World";

@Entity("monsters")
class Monster {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true, length: 255 })
  race: string;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({ name: "is_boss" })
  isBoss: boolean;

  @ManyToMany(() => World, (world) => world.monsters)
  worlds: World[];
}

export default Monster;
