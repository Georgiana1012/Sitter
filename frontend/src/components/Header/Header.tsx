import React from "react";
import {Button, Spacer, Box, HStack, ButtonGroup} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import "./Header.css"
import {useAuth} from "../../hooks/useAuth";
import {SuccessPage} from "../Success/Success";

export function Header(): JSX.Element {
    const auth = useAuth();
    let content: JSX.Element

    content = <Box w='100%' h='100px' backgroundColor="#001f3d">
        <HStack>
            <Link to="/">
                <h1 className='logo'>SITTER</h1>
            </Link>
            <Spacer/>
            <ButtonGroup role= 'buttonGroup' gap='2'>
                <Button colorScheme='whiteAlpha'
                        variant='ghost'
                        size="lg">
                    <Link to="/aboutus">Our Story</Link>
                </Button>
                <Button colorScheme='whiteAlpha'
                        variant='ghost'
                        size="lg">
                    <Link to="/menu">Our Menu</Link>
                </Button>
                {auth.isAuthenticated &&
                <Button colorScheme='whiteAlpha'
                        variant='ghost'
                        size="lg">
                    <Link to="/reservationList">My Reservations</Link>
                </Button>
                }
                <Button colorScheme='whiteAlpha'
                        variant='ghost'
                        size="lg"
                >
                    <Link to="/contactus">Contact Us</Link>
                </Button>
                {auth.isAuthenticated && <SuccessPage/>}
            </ButtonGroup>
        </HStack>
    </Box>
    return content
}
