import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1789518875799 implements MigrationInterface {
    name = 'UserEntity1789518875799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying, "gender" smallint, "birth_date" character varying, "password" character varying NOT NULL, "password_expires_in" TIMESTAMP, "email_pin" character varying, "email_pin_expires_in" TIMESTAMP, "phone_pin" character varying, "phone_pin_expires_in" TIMESTAMP, "street" character varying, "district" character varying, "number" integer, "city" character varying, "state" character varying, "country" character varying, "postal_code" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
