import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as Recaptcha from 'recaptcha-verify';

@ValidatorConstraint({name: 'IsCaptcha', async: true})
export class IsCaptcha implements ValidatorConstraintInterface {

    private secret: string;

    constructor(inSecret: string = null) {
        if (!inSecret) {
            this.secret = process.env.CAPTCHA_SECRET;
        } else {
            this.secret = inSecret;
        }
    }

    private async checkRecaptcha(value) {
        if (!value) {
            return new Promise(resolve => {
                resolve({});
            });
        } else {
            const recaptcha = new Recaptcha({
                secret: this.secret,
                verbose: true,
            });
            return new Promise((resolve, reject) => {
                recaptcha.checkResponse(value, (error, response) => {
                    if (error) {
                        reject(new Error(error));
                    } else {
                        resolve(response);
                    }
                });

            });

        }
    }

    async validate(text: string) {
        const result: any = await this.checkRecaptcha(text);
        if (result && result.success) {
            return true;
        } else {
            return false;
        }
    }

    defaultMessage(): string {
        return 'Captcha Validation failed';
    }

}