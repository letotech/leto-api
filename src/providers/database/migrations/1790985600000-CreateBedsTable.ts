import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBedsTable1790985600000 implements MigrationInterface {
  name = 'CreateBedsTable1790985600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "beds" (
        "id" SERIAL NOT NULL,
        "bed_code" character varying NOT NULL,
        "units_id" integer NOT NULL,
        "rooms_id" integer NOT NULL,
        "patients_id" integer,
        "bed_status" smallint NOT NULL DEFAULT 1,
        "organization_id" integer NOT NULL,
        "iot_mac_address" character varying,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_beds_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "beds"`);
  }
}