import { IsDateString, IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsCaptcha } from '../../common/validators';

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
	@IsNotEmpty()
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

	// @Validate(SerialPrefix)
	serialPrefix: string;

	// @Validate(SerialSuffix)
	serialSuffix: string;

	wantsOffers: boolean;

	@Validate(IsCaptcha)
	@IsNotEmpty()
	captcha: string;

	@IsNotEmpty()
	source: string;
}