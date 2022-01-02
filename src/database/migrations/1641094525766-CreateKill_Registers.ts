import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateKillRegisters1641094525766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "kill_registers",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "registered_at",
            type: "Date",
          },
          {
            name: "monsterId",
            type: "int",
          },
          {
            name: "worldId",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["monsterId"],
            referencedColumnNames: ["monstersId"],
            referencedTableName: "worlds_monsters_monsters",
          },
          {
            columnNames: ["worldId"],
            referencedColumnNames: ["worldsId"],
            referencedTableName: "worlds_monsters_monsters",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("kill_registers");
    if (!table) {
      return;
    }
    const foreignKeyMonsterId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("monsterId") !== -1
    );
    const foreignKeyWorldId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("worldId") !== -1
    );
    if (!foreignKeyMonsterId || !foreignKeyWorldId) {
      return;
    }
    await queryRunner.dropForeignKeys("kill_registers", [
      foreignKeyMonsterId,
      foreignKeyWorldId,
    ]);
    await queryRunner.dropTable("kill_registers");
  }
}
