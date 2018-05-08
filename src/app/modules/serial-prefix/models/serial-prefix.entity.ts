import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SerialPrefix {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	product_id: number;

	@Column()
	prefix: string;

	@Column()
	reward_product: number;

	@Column()
	stealth_product: number;
}