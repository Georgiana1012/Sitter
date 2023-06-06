import {ValidationError} from "./getValidationFieldErrorName";

export const getValidationFieldErrorsSurname = (value: string, validationFieldErrors: ValidationError[]) => {

    const validations = JSON.parse(JSON.stringify(validationFieldErrors))

    if (value.length <= 2) {
        if (validations.find((object: ValidationError) => {
            return object.field === 'lastName';
        })) {
            return validations
        }
        validations.push({message: "Surname is not valid", field: "lastName"});
        return validations
    }

    const indexOfObject = validations.findIndex((object: ValidationError) => {
        return object.field === 'lastName';
    });
    validations.splice(indexOfObject, 1);

    return validations
}