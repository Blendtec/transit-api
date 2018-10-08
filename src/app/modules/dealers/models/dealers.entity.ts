import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dealers {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({default: ''})
    nativeName: string;

    @Column({default: ''})
    streetAddress: string;

    @Column({default: ''})
    nativeStreetAddress: string;

    @Column({default: ''})
    address1: string;

    @Column({default: ''})
    address2: string;

    @Column({default: ''})
    city: string;

    @Column({default: ''})
    stateCode: string;

    @Column({default: ''})
    locations: string;

    @Column({default: ''})
    zip: string;

    @Column({default: ''})
    email: string;

    @Column({default: ''})
    phone: string;

    @Column({default: ''})
    fax: string;

    @Column({default: ''})
    countryCode: string;

    @Column({default: false})
    isRep: boolean;

    @Column({default: ''})
    website: string;

    @Column({default: ''})
    linkText: string;

    @Column({default: ''})
    registrationUri: string;

    @Column({default: ''})
    contact: string;

    @Column({default: ''})
    type: string;

    @Column({default: ''})
    accountnumber: string;
}