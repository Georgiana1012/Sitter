import {Box, Flex, Text, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import React from "react";
import {useAuth} from "../../hooks/useAuth";
import {createNotification, StatusOption} from "../../utils/createNotification";

//send text value for auth.isAuthenticated from parent as a parameter
//to rename as homepage

export function TopPage() {
    const auth = useAuth();

    if (auth.isLoading) {
        createNotification(StatusOption.warning, "Page is loading", "Please wait!");
        return <Box />;
    }

    return <>
        <Flex justify={"center"} backgroundColor="#001f3d">
            <VStack h="100vh" justify="center" spacing={8} color="white">
                <Text fontSize={"3xl"} role='authCheck'>
                    Please log in or create a new account to book a table!
                </Text>
                <Link to="/signin">
                    <Text fontSize={"2xl"}>
                        Go to log in page
                        <ExternalLinkIcon mx="4px" />
                    </Text>
                </Link>
                <Link to="/signup">
                    <Text fontSize={"2xl"}>
                        Go to sign up page
                        <ExternalLinkIcon mx="4px" />
                    </Text>
                </Link>
            </VStack>
        </Flex>
    </>
}