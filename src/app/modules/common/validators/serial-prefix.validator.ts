import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Inject, Component } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SerialPrefixService } from '../../serial-number/services/serial-prefix.service';

@ValidatorConstraint({name: 'SerialPrefix', async: true})
@Component()
export class SerialPrefix implements ValidatorConstraintInterface {

	constructor(@Inject('DbConnectionToken') private readonly connection: Connection) {}

	private async checkSerial(value, args: ValidationArguments) {
		if (!value) {
			return false;
		} else {
			const out = await this.connection.getRepository(args.constraints[0]).find({
				'prefix': value
			});
			if (out.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	async validate(text: string, args: ValidationArguments) {
		const result: any = await this.checkSerial(text, args);
		if (result) {
			return true;
		} else {
			return false;
		}
	}

	defaultMessage(args: ValidationArguments): string {
		return 'serial prefix validation failed';
	}

}