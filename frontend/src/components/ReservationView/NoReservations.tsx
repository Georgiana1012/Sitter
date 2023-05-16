import React from "react";
import {
    Button,
    Flex,
    Spacer, Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export function NoReservations(): JSX.Element {
    let content: JSX.Element;

    content =  <>
        <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
            <VStack h={500} justify="center">
                <form noValidate>
                    <Text fontWeight="bold">You have no reservations active. You can book a new reservation by clicking the button below.</Text>
                    <Spacer height="15px"/>
                    <Stack align="center">
                        <Button colorScheme='blue'
                                size="lg"
                                marginTop="20px"
                        >
                            <Link to ="/booking" >Book a table</Link>
                        </Button>
                    </Stack>
                </form>
            </VStack>
        </Flex>
    </>
    return content;
}