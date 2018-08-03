import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dealers {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({default: ''})
    native_name: string;

    @Column({default: ''})
    street_address: string;

    @Column({default: ''})
    native_street_address: string;

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
    country_code: string;

    @Column({default: false})
    isRep: boolean;

    @Column({default: ''})
    website: string;

    @Column({default: ''})
    linkText: string;

    @Column({default: ''})
    registration_uri: string;

    @Column({default: ''})
    contact: string;
}