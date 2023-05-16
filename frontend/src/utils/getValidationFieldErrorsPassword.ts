export type ValidationError = {
    message: string,
    field: string
}

export const getValidationFieldErrorsPassword = (value: string, validationFieldErrors: ValidationError[]) => {

    const validations = JSON.parse(JSON.stringify(validationFieldErrors))

    if (value.length <= 2) {
        if (validations.find((object: ValidationError) => {
            return object.field === 'password';
        })) {
            return validations
        }
        validations.push({message: "Password is not valid", field: "password"});
        return validations
    }

    const indexOfObject = validations.findIndex((object: ValidationError) => {
        return object.field === 'password';
    });
    validations.splice(indexOfObject, 1);

    return validations
}