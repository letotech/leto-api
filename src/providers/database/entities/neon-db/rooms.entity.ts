import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rooms' })
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'rooms_code', length: 45 })
    roomsCode: string;
}