import { IsString, IsNumber } from 'class-validator';
import { Prefix } from '../../../validators/prefix.validator';

export class CreateSerialPrefixDto {
	@IsNumber()
	product_id: number;

	@IsString()
	prefix: string;

	@IsNumber()
	reward_product: number;

	@IsNumber()
	stealth_product: number;
}
