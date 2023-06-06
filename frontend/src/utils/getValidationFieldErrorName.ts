export type ValidationError = {
    message: string,
    field: string
}

export const getValidationFieldErrorsName = (value: string, validationFieldErrors: ValidationError[]) => {

    const validations = JSON.parse(JSON.stringify(validationFieldErrors))

    if (value.length <= 2) {
        if (validations.find((object: ValidationError) => {
            return object.field === 'firstName';
        })) {
            return validations
        }
        validations.push({message: "Name is not valid", field: "firstName"});
        return validations
    }

    const indexOfObject = validations.findIndex((object: ValidationError) => {
        return object.field === 'firstName';
    });
    validations.splice(indexOfObject, 1);

    return validations
}