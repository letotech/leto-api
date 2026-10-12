
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'rooms_code', length: 45 })
    roomsCode: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}
