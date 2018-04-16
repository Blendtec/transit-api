import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SerialPrefix {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({length: 60})
    prefix: string;
}