// @format
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class VairaLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column('decimal', { precision: 5, scale: 3 })
    startWeight: number;

    @Column('decimal', { precision: 5, scale: 3 })
    endWeight: number;

    @Column()
    oilType: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    stops: number;

    @CreateDateColumn()
    createdOn: string;

    @UpdateDateColumn()
    modfiedOn: string;
}
