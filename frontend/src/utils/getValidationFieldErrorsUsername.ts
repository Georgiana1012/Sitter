export type ValidationError = {
    message: string,
    field: string
}

export const getValidationFieldErrorsUsername = (value: string, validationFieldErrors: ValidationError[]) => {

    const validations = JSON.parse(JSON.stringify(validationFieldErrors))

    if (value.length <= 2) {
        if (validations.find((object: ValidationError) => {
            return object.field === 'username';
        })) {
            return validations
        }
        validations.push({message: "Username is not valid", field: "username"});
        return validations
    }

    const indexOfObject = validations.findIndex((object: ValidationError) => {
        return object.field === 'username';
    });
    validations.splice(indexOfObject, 1);

    return validations
}