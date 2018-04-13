import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductRegistration {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 500 })
	firstName: string;

	@Column({ length: 500 })
	lastName: string;

	@Column({ length: 500 })
	addressOne: string;

	@Column({ length: 500 })
	addressTwo: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	zip: string;

	@Column()
	country: string;

	@Column()
	email: string;

	@Column()
	phone: string;

	@Column()
	purchasePlace: string;

	@Column()
	purchaseDate: string;

	@Column()
	purchaseOther: string;

	@Column()
	serialPrefix: string;

	@Column()
	serialSuffix: string;

	@Column()
	wantsOffers: boolean;

	@Column()
	source: string;

	@CreateDateColumn()
	createdOn: string;

	@UpdateDateColumn()
	modfiedOn: string;

	@Column({default: false})
	processed: boolean;
}