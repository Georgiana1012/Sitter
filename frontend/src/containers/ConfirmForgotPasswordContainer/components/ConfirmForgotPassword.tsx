import React, {useState} from 'react';
import {Box, Button, Flex, FormLabel, Spacer, Stack, VStack, Input} from "@chakra-ui/react";

export type ConfirmForgotPasswordProps = {
    onConfirmForgotPassword: (username: string, code: string, password: string,) => void;
}

export function ConfirmSignUp( { onConfirmForgotPassword }: ConfirmForgotPasswordProps ){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const handleConfirmSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onConfirmForgotPassword(username, code, password);
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
                        <Box>
                            <FormLabel htmlFor="password">New Password</FormLabel>
                            <Spacer height="10px"/>
                            <Input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                Confirm Password Change
                            </Button>
                        </Stack>
                    </form>
                </VStack>
            </Flex>
        </>
    );
}

export default ConfirmSignUp;
