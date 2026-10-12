import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToRooms1791810000000
    implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rooms"
            ADD COLUMN "deleted_at" TIMESTAMP NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rooms"
            DROP COLUMN "deleted_at"
        `);
    }
}
