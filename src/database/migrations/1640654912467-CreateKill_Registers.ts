import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateKillRegisters1640654912467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "kill_registers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "registered_at",
            type: "Date",
            isUnique: true,
          },
          {
            name: "monster_id",
            type: "int",
          },
        ],
        foreignKeys: [
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
    queryRunner.dropTable("kill_registers");
  }
}
