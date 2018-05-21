import { IsDateString, IsEmail, IsNotEmpty, IsString, Validate, IsNumber } from 'class-validator';
import { IsCaptcha, SerialPrefix } from '../../common/validators';
import { SerialPrefix as SP } from '../../serial-number/models/serial-prefix.entity';

export class CreateWarrantyDto {
	@IsString()
	@IsNotEmpty()
	first_name: string;

	@IsString()
	@IsNotEmpty()
	last_name: string;

	@IsString()
	@IsNotEmpty()
	street: string;

	@IsString()
	@IsNotEmpty()
	city: string;

	@IsString()
	@IsNotEmpty()
	state: string;

	@IsString()
	@IsNotEmpty()
	zip_code: string;

	@IsNotEmpty()
	phone_number: string;

	@IsEmail()
	email_address: string;

	@IsString()
	@IsNotEmpty()
	country: string;

	@IsString()
	@IsNotEmpty()
	preferred_contact_method: string;

	@IsString()
	@IsNotEmpty()
	preferred_contact_time: string;

	@IsString()
	@IsNotEmpty()
	time_zone: string;

	@IsString()
	@IsNotEmpty()
	serial_number: string;

	@IsString()
	jar_size: string;

	jar_number: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	jar_sounds: string;

	@IsString()
	smooth_spinning: string;

	@IsString()
	wiggle_shaft: string;

	@IsString()
	leaky_jar: string;

	purchasePlace: string;

	@IsDateString()
	purchaseDate: string;

	purchaseOther: string;

	@Validate(IsCaptcha)
	@IsNotEmpty()
	recaptcha: string;
}