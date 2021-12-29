import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWorlds1640653911472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "worlds",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "location",
            type: "varchar",
          },
          {
            name: "pvp_type",
            type: "varchar",
          },
          {
            name: "transfer_type",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("worlds");
  }
}
