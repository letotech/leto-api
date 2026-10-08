import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomsEntity1789518875801 implements MigrationInterface {
    name = 'RoomsEntity1789518875801';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rooms" (
                "id" SERIAL NOT NULL,
                "rooms_code" character varying(45) NOT NULL,
                CONSTRAINT "PK_rooms_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "rooms"
        `);
    }
}