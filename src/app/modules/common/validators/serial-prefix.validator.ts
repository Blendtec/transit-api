import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Inject, Component } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SerialPrefixService } from '../../serial-number/services/serial-prefix.service';

@ValidatorConstraint({name: 'SerialPrefix', async: true})
@Component()
export class SerialPrefix implements ValidatorConstraintInterface {

	private serialPrefixService;

	constructor(@Inject('DbConnectionToken') private readonly connection: Connection) {
		this.serialPrefixService = new SerialPrefixService();
	}

	private async checkSerial(value) {
		if (!value) {
			return false;
		} else {
			const out = await this.serialPrefixService.findPrefix(value);
			if (out.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	async validate(text: string, args: ValidationArguments) {
		this.serialPrefixService.setConnection(this.connection.getRepository(args.constraints[0]));
		const result: any = await this.checkSerial(text);
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