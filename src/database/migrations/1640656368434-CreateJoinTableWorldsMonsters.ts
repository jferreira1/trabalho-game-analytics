import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJoinTableWorldsMonsters1640656368434
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "worlds_monsters_monsters",
        columns: [
          {
            name: "worldsId",
            type: "int",
          },
          {
            name: "monstersId",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["worldsId"],
            referencedColumnNames: ["id"],
            referencedTableName: "worlds",
          },
          {
            columnNames: ["monstersId"],
            referencedColumnNames: ["id"],
            referencedTableName: "monsters",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("worlds_monsters_monsters");
    if (!table) {
      return;
    }
    const foreignKeyMonsterId = await table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("monsterId") !== -1
    );
    const foreignKeyWorldId = await table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("worldId") !== -1
    );
    if (!foreignKeyMonsterId || !foreignKeyWorldId) {
      return;
    }
    await queryRunner.dropForeignKeys("worlds_monsters_monsters", [
      foreignKeyMonsterId,
      foreignKeyWorldId,
    ]);

    await queryRunner.dropTable("worlds_monsters_monsters");
  }
}
