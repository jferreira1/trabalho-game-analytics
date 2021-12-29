import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("monsters")
class Monster {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  race: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: "is_boss" })
  isBoss: number;
}

export default Monster;
