// @format
import { IsDateString, IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { IsDataUrl } from '../../common/validators/isdata-url.validator';

export class CreateWarrantyDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

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
    zipCode: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsEmail()
    emailAddress: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    contactMethod: string;

    @IsString()
    @IsNotEmpty()
    contactTime: string;

    @IsString()
    @IsNotEmpty()
    timeZone: string;

    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @IsString()
    jarSize: string;

    @IsString()
    jarNumber: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    whichProblem: string;

    @IsString()
    hasUnusualSounds: string;

    @IsString()
    isSmoothSpinning: string;

    @IsString()
    isShaftSecure: string;

    @IsString()
    isLeakingJar: string;

    purchasePlace: string;

    @IsDateString()
    purchaseDate: Date;

    purchaseOther: string;

    @IsOptional()
    @IsDataUrl()
    serialImage: string;

    @IsOptional()
    @IsDataUrl()
    jarNumberImage: string;

    @IsOptional()
    @IsDataUrl()
    receiptImage: string;

    @IsOptional()
    @IsDataUrl()
    problemImage: string;
}
