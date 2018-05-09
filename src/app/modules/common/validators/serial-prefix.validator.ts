import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Inject, Component } from '@nestjs/common';
import { Connection } from 'typeorm';

@ValidatorConstraint({name: 'SerialPrefix', async: true})
@Component()
export class SerialPrefix implements ValidatorConstraintInterface {

	constructor(@Inject('DbConnectionToken') private readonly connection: Connection) {
		console.log('connection here');
		console.log(this.connection);
	}

	private async checkSerial(value) {
		if (!value) {
			return new Promise(resolve => {
				resolve({});
			});
		} else {
			console.log(serialPrefixService.findAll());
		}
	}

	async validate(text: string, args: ValidationArguments) {
		const out = await this.connection.getRepository(args.constraints[0]).findAll();
		console.log(out);
		const result: any = await this.checkSerial(text);
		if (result && result.success) {
			return true;
		} else {
			return false;
		}
	}

}