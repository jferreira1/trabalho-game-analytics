import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Monster {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  race: string;
}
