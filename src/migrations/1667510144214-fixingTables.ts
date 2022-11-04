import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingTables1667510144214 implements MigrationInterface {
    name = 'fixingTables1667510144214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "zipCode" character varying(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "UQ_773ac16442ec27042d735ac88b8" UNIQUE ("propertyId")`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "state" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_773ac16442ec27042d735ac88b8" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_773ac16442ec27042d735ac88b8"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "state" character varying(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "UQ_773ac16442ec27042d735ac88b8"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "propertyId"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "zipCode"`);
    }

}
