import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { SerialPrefixService } from '../modules/serial-prefix/services/serial-prefix.service';
import { databaseProviders } from '../modules/database/database.providers';
import * as mysqlcon from 'mysql';

@ValidatorConstraint({name: 'Prefix', async: true})
export class Prefix implements ValidatorConstraintInterface {

	private con = null;

	constructor(private serialPrefixService: SerialPrefixService) {}

	private async checkSerial(value) {
		if (!value) {
			return new Promise(resolve => {
				resolve({});
			});
		} else {
			let self = this;
			 this.con = mysqlcon.createConnection({
			  host: process.env.DB_HOST,
			  user: process.env.DB_USER,
			  password: process.env.DB_PASSWORD,
			  database: process.env.DB_NAME
			});	
			return new Promise((resolve, reject) => {
				self.con.connect(function(err) {
				  if (err) throw err;
				  let sql = "SELECT * FROM serial_prefix WHERE prefix = ?";
				  self.con.query(sql, [value], (err, result, fields) => {
				    if (err) {
				    	reject(new Error(error));
				    } else {
				    	resolve(result);
				    }

				  });
				});
			});
			
			
		}
	}

	async validate(serial: string, args: ValidationArguments) {
		const result: any = await this.checkSerial(serial);
		if (result && result.length > 0) {
			return true;
		} else {
			return false;
		}
	}


}