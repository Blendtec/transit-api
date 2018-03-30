import { IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { IsCaptcha } from '../../../decorators/captcha-decorator';

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

	//@IsSerialPrefix()
	serialPrefix: string;

	//@IsSerialSuffix()
	serialSuffix: string;

	wantsOffers: boolean;

	@IsCaptcha()
	@IsNotEmpty()
	captcha: string;

	@IsNotEmpty()
	source: string;
}