import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Warranty {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 20 })
	first_name: string;

	@Column({ length: 40 })
	last_name: string;

	@Column({ length: 100 })
	street: string;

	@Column({ length: 50 })
	city: string;

	@Column({ length: 20 })
	state: string;

	@Column({ length: 11 })
	zip_code: string;

	@Column({ length: 20 })
	phone_number: string;

	@Column({ length: 50 })
	email_address: string;

	@Column({ length: 20 })
	country: string;

	@Column({ length: 10 })
	preferred_contact_method: string;

	@Column({ length: 10 })
	preferred_contact_time: string;

	@Column({ length: 7 })
	time_zone: string;

	@Column()
	serial_number: string;

	@Column({ length: 10 })
	jar_size: string;

	@Column({ length: 10 })
	jar_number: string;

	@Column({ length: 500 })
	description: string;

	@Column({ length: 10 })
	jar_sounds: string;

	@Column({ length: 10 })
	smooth_spinning: string;

	@Column({ length: 10 })
	wiggle_shaft: string;

	@Column({ length: 10 })
	leaky_jar: string;

	@CreateDateColumn()
	createdOn: string;

	@UpdateDateColumn()
	modfiedOn: string;

	@Column({default: false})
	processed: boolean;

	serialnumber: string; //image

	jarnumber: string; //image

	problem: string; //image

	receiptPhoto: string; //image
}