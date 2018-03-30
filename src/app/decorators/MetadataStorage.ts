
export class MetadataStorageAndValidation {
 public fieldName: string = '';
 public classNametoCaptcha = {};

    addValidationMetadata(className:string, metadata: string) {
        this.classNametoCaptcha[className] = metadata;
    }

    private async checkRecaptcha(value) {
        if (!value || !value[this.fieldName]) {
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
                recaptcha.checkResponse(value[this.fieldName], function(error, response){
                    if (error) {
                        reject(new Error(error));
                    } else if (!response['success']) {
                        resolve(response);
                    } else {
                        resolve(response);
                    }
                });

            });

        }
    }

    async validateMetadata(className, value){
        if (this.classNametoCaptcha[className]) {
            this.fieldName = this.classNametoCaptcha[className];
        } else {
            this.fieldName = '';
        }
        if (this.fieldName !== '') {
            const result = await this.checkRecaptcha(value);
            if (result['success']) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

}