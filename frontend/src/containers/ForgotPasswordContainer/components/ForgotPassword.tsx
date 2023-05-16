import React, {useState} from 'react';
import {Box, Button, Flex, FormLabel, Input, Spacer, VStack} from "@chakra-ui/react";

export type ForgotPasswordProps = {
    onForgotPassword: (username: string) => void;
}

export function ForgotPassword({ onForgotPassword }: ForgotPasswordProps) {
    const [username, setUsername] = useState("");


    const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onForgotPassword(username);
    }

    return (<>
            <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
                <VStack h={500} justify="center">
                    <form noValidate onSubmit={handleForgotPassword}>
                        <Box>
                            <FormLabel htmlFor="username">User Name</FormLabel>
                            <Spacer height="10px"/>
                            <Input
                                type="text"
                                name = "username"
                                placeholder="UserID"
                                value={username}
                                onChange={(event)=>{setUsername(event.target.value)}}
                                size="lg"
                            />
                        </Box>
                        <Spacer height="20px"/>
                            <Button type="submit" colorScheme='blue'
                                    size="lg"
                                    marginTop="20px">
                                Resend Code
                            </Button>
                    </form>
                </VStack>
            </Flex>
        </>
    );
}
