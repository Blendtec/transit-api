import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

@ValidatorConstraint({ name: "IsCaptcha", async: true })
export class IsCaptcha implements ValidatorConstraintInterface {

	private async checkRecaptcha(value) {
        if (!value) {
            return new Promise((resolve, reject) => {
                resolve({});
            });
        } else {
            const Recaptcha = require('recaptcha-verify');
            const recaptcha = new Recaptcha({
                secret: process.env.CAPTCHA_SECRET,
                verbose: true
            });
            return new Promise((resolve, reject) => {
                recaptcha.checkResponse(value, function(error, response){
                    if (error) {
                        reject(new Error(error));
                    } else {
                        resolve(response);
                    }
                });

            });

        }
    }

    async validate(text: string, args: ValidationArguments) {
    	const result = await this.checkRecaptcha(text);
    	if (result['success']) {
    		return true;
    	} else {
    		return false;
    	}
    }

    defaultMessage(args: ValidationArguments) {
        return "Captcha Validation failed";
    }

}