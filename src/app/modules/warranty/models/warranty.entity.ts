import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Warranty {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 40 })
    lastName: string;

    @Column({ length: 100 })
    street: string;

    @Column({ length: 50 })
    city: string;

    @Column({ length: 20 })
    state: string;

    @Column({ length: 11 })
    zipCode: string;

    @Column({ length: 20 })
    phoneNumber: string;

    @Column({ length: 50 })
    emailAddress: string;

    @Column({ length: 20 })
    country: string;

    @Column({ length: 10 })
    contactMethod: string;

    @Column({ length: 10 })
    contactTime: string;

    @Column({ length: 7 })
    timeZone: string;

    @Column()
    serialNumber: string;

    @Column({ length: 10 })
    jarSize: string;

    @Column({ length: 10 })
    jarNumber: string;

    @Column({ length: 500 })
    description: string;

    @Column({ length: 10 })
    hasUnusualSounds: string;

    @Column({ length: 10 })
    howToOwn: string;

    @Column({ length: 10 })
    isSmoothSpinning: string;

    @Column({ length: 10 })
    isShaftSecure: string;

    @Column({ length: 10 })
    isLeakingJar: string;

    @Column()
    whichProblem: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    modfiedOn: Date;

    @Column({default: false})
    isProcessed: boolean;

    @Column()
    purchaseDate: Date;

    @Column()
    purchaseOther: string;

    @Column()
    purchasePlace: string;

    @Column('longtext')
    serialImage: string;

    @Column('longtext')
    jarNumberImage: string;

    @Column('longtext')
    problemImage: string;

    @Column('longtext')
    receiptImage: string;
}