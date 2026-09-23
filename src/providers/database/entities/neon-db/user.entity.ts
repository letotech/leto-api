import { Gender } from "src/shared/enums/gender.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'first_name' })
    firstName: string

    @Column({ name: 'last_name' })
    last_name: string

    @Column({ name: 'full_name' })
    fullName: string

    @Column({ name: 'email' })
    email: string

    @Column({ name: 'cpf' })
    cpf: string

    @Column({ name: 'phone', nullable: true })
    phone: string

    @Column({ type: 'smallint', name: 'gender', nullable: true })
    gender?: number

    @Column({ name: 'birth_date', nullable: true })
    birthDate?: string

    @Column({ name: 'password' })
    password: string

    @Column({ name: 'password_expires_in', nullable: true })
    passwordExpiresIn?: Date

    @Column({ name: 'email_pin', nullable: true })
    emailPin?: string

    @Column({ name: 'email_pin_expires_in', nullable: true })
    emailPinExpiresIn?: Date

    @Column({ name: 'phone_pin', nullable: true })
    phonePin?: string

    @Column({ name: 'phone_pin_expires_in', nullable: true })
    phonePinExpiresIn?: Date

    @Column({ name: 'street', nullable: true })
    street?: string

    @Column({ name: 'district', nullable: true })
    district?: string

    @Column({ name: 'number', nullable: true })
    number?: number

    @Column({ name: 'city', nullable: true })
    city?: string

    @Column({ name: 'state', nullable: true })
    state?: string

    @Column({ name: 'country', nullable: true })
    country?: string

    @Column({ name: 'postal_code', nullable: true })
    postalCode?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}