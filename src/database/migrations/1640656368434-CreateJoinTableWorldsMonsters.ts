import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJoinTableWorldsMonsters1640656368434
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "worlds_monsters",
        columns: [
          {
            name: "world_id",
            type: "int",
          },
          {
            name: "monster_id",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["world_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "worlds",
          },
          {
            columnNames: ["monster_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "monsters",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("worlds_monsters");
  }
}
