import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Inject, Component } from '@nestjs/common';
import { Connection } from 'typeorm';

@ValidatorConstraint({name: 'SerialPrefix', async: true})
@Component()
export class SerialPrefix implements ValidatorConstraintInterface {

	constructor(@Inject('DbConnectionToken') private readonly connection: Connection) {}

	private async checkSerial(value, args: ValidationArguments) {
		if (!value) {
			return new Promise(resolve => {
				resolve(false);
			});
		} else {
			const out = await this.connection.getRepository(args.constraints[0]).find({
				'prefix': value
			});
			if (out.length > 0) {
				return new Promise(resolve => {
					resolve(true);
				});
			} else {
				return new Promise(resolve => {
					resolve(false);
				});
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

}