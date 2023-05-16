export type ValidationError = {
    message: string,
    field: string
}

export const getValidationFieldErrorsEmail = (value: string, validationFieldErrors: ValidationError[]) => {

    const validations = JSON.parse(JSON.stringify(validationFieldErrors))

    if (value.length <= 2) {
        if (validations.find((object: ValidationError) => {
            return object.field === 'email';
        })) {
            return validations
        }
        validations.push({message: "Email is not valid", field: "email"});
        return validations
    }

    const indexOfObject = validations.findIndex((object: ValidationError) => {
        return object.field === 'email';
    });
    validations.splice(indexOfObject, 1);

    return validations
}