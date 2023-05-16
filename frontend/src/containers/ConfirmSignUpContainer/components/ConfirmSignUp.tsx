import React, {useState} from 'react';
import {Box, Button, Flex, FormLabel, Spacer, Stack, VStack, Input} from "@chakra-ui/react";

//check if layout is used correctly

//check if toast messages are correct

//how to add field validators for my components ???

//can you add images from the source file of the app instead of using an url

//**implement forgot password and delete account components

//**make snapshot tests for all the components

export type ConfirmSignUpProps = {
    onConfirmSignUp: (username: string, code: string) => void;
}

export function ConfirmSignUp( { onConfirmSignUp }: ConfirmSignUpProps ){
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");

    const handleConfirmSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onConfirmSignUp(username, code);
    }

    return (<>
            <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
                <VStack h={500} justify="center">
                    <form noValidate onSubmit={handleConfirmSignUp}>
                        <Box>
                            <FormLabel htmlFor="username">User Name</FormLabel>
                            <Spacer height="10px"/>
                            <Input
                                type="text"
                                placeholder="UserID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                size="lg"
                            />
                        </Box>
                        <Spacer height="20px"/>
                        <FormLabel htmlFor="code">Code</FormLabel>
                        <Input
                            type="text"
                            placeholder="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            size="lg"
                        />
                        <Spacer height="35px"/>
                        <Stack align="center">
                            <Button type="submit" colorScheme='blue'
                                    size="lg"
                                    marginTop="20px">
                                Verify Your Account
                            </Button>
                        </Stack>
                    </form>
                </VStack>
            </Flex>
        </>
    );
}

export default ConfirmSignUp;
