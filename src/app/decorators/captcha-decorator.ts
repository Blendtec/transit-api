import {ValidationOptions} from "./ValidationOptions";
import { MetadataStorageAndValidation } from './MetadataStorage';
import { getFromContainer } from './container';

export function IsCaptcha(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
    	getFromContainer(MetadataStorageAndValidation).addValidationMetadata(object.constructor.name, propertyName);
    };
}