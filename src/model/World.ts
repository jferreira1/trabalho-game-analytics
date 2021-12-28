import { Entity, Column, PrimaryColumn } from "typeorm";

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
}
