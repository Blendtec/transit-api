import {registerDecorator, ValidationOptions} from 'class-validator';

export function IsDataUrl(validationOptions?: ValidationOptions) {
   return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isDataUrl',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const regex = new RegExp(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);

                    if (value.length > 0) {
                        return regex.test(value);
                    }
                    return true;
                },
            },
        });
   };
}