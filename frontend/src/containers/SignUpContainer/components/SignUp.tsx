import React, {useEffect, useState} from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Spacer,
    Stack,
    VStack
} from "@chakra-ui/react";
import {getValidationFieldErrorsUsername, ValidationError} from '../../../utils/getValidationFieldErrorsUsername';
import {getValidationFieldErrorsPassword} from "../../../utils/getValidationFieldErrorsPassword";
import {getValidationFieldErrorsEmail} from "../../../utils/getValidationFieldErrorEmail";

export type SignUpProps = {
    onSignUp: (username: string, password: string, email: string) => void;
}

export function SignUp({onSignUp}: SignUpProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
    const [validationFieldErrors, setValidationFieldErrors] = useState<ValidationError[]>([]);

    let isErrorUsername = false;
    let isErrorPassword = false;
    let isErrorEmail = false;

    const errorUsername = validationFieldErrors.find(((object: ValidationError) => {
        isErrorUsername = true;
        return object.field === 'username';
    }));

    const errorPassword = validationFieldErrors.find(((object: ValidationError) => {
        isErrorPassword = true;
        return object.field === 'password';
    }));

    const errorEmail = validationFieldErrors.find(((object: ValidationError) => {
        isErrorEmail = true;
        return object.field === 'email';
    }));

    useEffect(() => {
        if (validationFieldErrors.length > 0 || !username || !password || !email) {
            setSignUpButtonDisabled(true);
            return
        }
        setSignUpButtonDisabled(false);
    }, [validationFieldErrors.length, username, password, email])

    const validateFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const fieldName = e.target.name;

        if (fieldName === "username") {
            setUsername(value);
            setValidationFieldErrors(getValidationFieldErrorsUsername(value, validationFieldErrors));
        }

        if (fieldName === "password") {
            setPassword(value);
            setValidationFieldErrors(getValidationFieldErrorsPassword(value, validationFieldErrors));
        }

        if(fieldName === "email") {
            setEmail(value);
            setValidationFieldErrors(getValidationFieldErrorsEmail(value, validationFieldErrors));
        }
    }

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSignUp(username, password, email);
    }

    return (<>
            <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
                <VStack h={500} justify="center">
                    <form noValidate onSubmit={handleSignUp}>
                        <FormControl isInvalid={isErrorUsername}>
                            <FormLabel htmlFor="username">User Name</FormLabel>
                            <Spacer height="10px"/>
                            <Input
                                type="text"
                                name="username"
                                placeholder="UserID"
                                value={username}
                                onChange={validateFormValues}
                                size="lg"
                            />
                            {errorUsername && <FormErrorMessage> {errorUsername.message} </FormErrorMessage>}
                        </FormControl>
                        <Spacer height="20px"/>
                        <FormControl isInvalid={isErrorPassword}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={validateFormValues}
                                size="lg"
                            />
                            {errorPassword && <FormErrorMessage>{errorPassword.message}</FormErrorMessage>}
                        </FormControl>
                        <Spacer height="20px"/>
                        <FormControl isInvalid={isErrorEmail}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={validateFormValues}
                                size="lg"
                            />
                            {errorEmail && <FormErrorMessage>{errorEmail.message}</FormErrorMessage>}
                        </FormControl>
                        <Spacer height="35px"/>
                        <Stack align="center">
                            <Button type="submit" colorScheme='blue'
                                    size="lg"
                                    marginTop="20px" isDisabled={signUpButtonDisabled}>
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </VStack>
            </Flex>
        </>
    );
}
