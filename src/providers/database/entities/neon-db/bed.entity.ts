import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BedStatus } from "src/shared/enums/bedStatus.enum";

@Entity({ name: 'beds' })
export class Bed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'bed_code' })
    bedCode: string;

    @Column({ name: 'units_id' })
    unitsId: number;

    @Column({ name: 'rooms_id' })
    roomsId: number;

    @Column({ name: 'patients_id', nullable: true })
    patientsId?: number;

    @Column({ type: 'smallint', name: 'bed_status', default: BedStatus.AVAILABLE })
    bedStatus: number;

    @Column({ name: 'organization_id' })
    organizationId: number;

    @Column({ name: 'iot_mac_address', nullable: true })
    iotMacAddress?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;
}