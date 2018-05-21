import { IsDateString, IsEmail, IsNotEmpty, IsString, Validate, IsNumber } from 'class-validator';
import { IsCaptcha, SerialPrefix } from '../../common/validators';
import { SerialPrefix as SP } from '../../serial-number/models/serial-prefix.entity';

export class CreateProductRegistrationDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	addressOne: string;

	addressTwo: string;

	@IsString()
	@IsNotEmpty()
	city: string;

	@IsString()
	state: string;

	@IsString()
	@IsNotEmpty()
	zip: string;

	@IsString()
	@IsNotEmpty()
	country: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	phone: string;

	purchasePlace: string;

	@IsDateString()
	purchaseDate: string;

	purchaseOther: string;

	@Validate(SerialPrefix, [SP])
	serialPrefix: string;

	serialSuffix: string;

	wantsOffers: boolean;

	@Validate(IsCaptcha)
	@IsNotEmpty()
	captcha: string;

	@IsNotEmpty()
	source: string;
}