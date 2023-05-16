import React, {useEffect, useState} from 'react';
import {Button, Flex, FormErrorMessage, FormLabel, FormControl, Input, Spacer, Stack, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {getValidationFieldErrorsUsername, ValidationError} from "../../../utils/getValidationFieldErrorsUsername";
import {getValidationFieldErrorsPassword} from "../../../utils/getValidationFieldErrorsPassword";

export type SignInpProps = {
    onSignIn: (username: string, password: string) => void;
}

export function SignIn({onSignIn}: SignInpProps,) {
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(true)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationFieldErrors, setValidationFieldErrors] = useState<ValidationError[]>([]);

    let isErrorUsername = false;
    let isErrorPassword = false;

    const errorUsername = validationFieldErrors.find(((object: ValidationError) => {
        isErrorUsername = true;
        return object.field === 'username';
    }));

    const errorPassword = validationFieldErrors.find(((object: ValidationError) => {
        isErrorPassword = true;
        return object.field === 'password';
    }));

    useEffect(() => {
        if (validationFieldErrors.length > 0 || !username || !password) {
            setLoginButtonDisabled(true);
            return
        }
        setLoginButtonDisabled(false);
    }, [validationFieldErrors.length, username, password])

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSignIn(username, password);
    }

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
    }

    return (<>
            <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
                <VStack h={500} justify="center">
                    <form noValidate onSubmit={handleSignIn}>
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
                            {errorPassword && <FormErrorMessage> {errorPassword.message} </FormErrorMessage>}
                        </FormControl>
                        <Spacer height="35px"/>
                        <Button colorScheme='blue'
                                variant='ghost'
                                size="medium"
                                marginTop="20px">
                            <Link to="/forgotpassword">Forgot Password?</Link>
                        </Button>
                        <Spacer height="35px"/>
                        <Stack align="center">
                            <Button type="submit" colorScheme='blue'
                                    size="lg"
                                    marginTop="20px" isDisabled={loginButtonDisabled}>
                                Login
                            </Button>
                        </Stack>
                    </form>
                </VStack>
            </Flex>
        </>
    );
}
