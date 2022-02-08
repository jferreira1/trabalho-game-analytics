import {MigrationInterface, QueryRunner} from "typeorm";

export class Update1644280649352 implements MigrationInterface {
    name = 'Update1644280649352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`kill_registers\` ADD UNIQUE INDEX \`IDX_bded1bd82aefcc56571be2fe7d\` (\`worldId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_bded1bd82aefcc56571be2fe7d\` ON \`kill_registers\` (\`worldId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_7c079c785d019a059825c354a6\` ON \`worlds_monsters_monsters\` (\`worldsId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_68aa66b469d1990c1cd351ccee\` ON \`worlds_monsters_monsters\` (\`monstersId\`)`);
        await queryRunner.query(`ALTER TABLE \`kill_registers\` ADD CONSTRAINT \`FK_b15f84b10df37b467386951de5f\` FOREIGN KEY (\`monsterId\`) REFERENCES \`monsters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kill_registers\` ADD CONSTRAINT \`FK_bded1bd82aefcc56571be2fe7d4\` FOREIGN KEY (\`worldId\`) REFERENCES \`worlds\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`worlds_monsters_monsters\` ADD CONSTRAINT \`FK_7c079c785d019a059825c354a6d\` FOREIGN KEY (\`worldsId\`) REFERENCES \`worlds\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`worlds_monsters_monsters\` DROP FOREIGN KEY \`FK_7c079c785d019a059825c354a6d\``);
        await queryRunner.query(`ALTER TABLE \`kill_registers\` DROP FOREIGN KEY \`FK_bded1bd82aefcc56571be2fe7d4\``);
        await queryRunner.query(`ALTER TABLE \`kill_registers\` DROP FOREIGN KEY \`FK_b15f84b10df37b467386951de5f\``);
        await queryRunner.query(`DROP INDEX \`IDX_68aa66b469d1990c1cd351ccee\` ON \`worlds_monsters_monsters\``);
        await queryRunner.query(`DROP INDEX \`IDX_7c079c785d019a059825c354a6\` ON \`worlds_monsters_monsters\``);
        await queryRunner.query(`DROP INDEX \`REL_bded1bd82aefcc56571be2fe7d\` ON \`kill_registers\``);
        await queryRunner.query(`ALTER TABLE \`kill_registers\` DROP INDEX \`IDX_bded1bd82aefcc56571be2fe7d\``);
    }

}
