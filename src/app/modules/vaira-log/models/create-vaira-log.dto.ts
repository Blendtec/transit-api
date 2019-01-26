// @format
import {
    IsInt,
    IsEmail,
    IsNotEmpty,
    IsString,
    IsNumber,
    IsPositive,
    IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateVairaLogDto {
    @IsString()
    @IsEmail()
    user: string;

    @IsNumber()
    @IsPositive()
    @Transform(parseFloat)
    startWeight: number;

    @IsNumber()
    @IsPositive()
    @Transform(parseFloat)
    endWeight: number;

    @IsNotEmpty()
    oilType: string;

    @IsDateString()
    startTime: number;

    @IsDateString()
    endTime: number;

    @IsInt()
    @Transform(parseInt)
    stops: number;
}
