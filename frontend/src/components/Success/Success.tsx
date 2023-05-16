import React from 'react'
import {useAuth} from "../../hooks/useAuth";
import PrivateRoute from "../../PrivateRoute";
import {Avatar, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, Spinner, Text} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {Link} from "react-router-dom";
import {SignOutContainer} from "../../containers/SignOutContainer/SignOutContainer";


export function SuccessPage() {
    const auth = useAuth();

    if (auth.isLoading) {
        createNotification(StatusOption.warning, "Please wait.", "Page is loading.");
        return <Spinner/>;
    }

    return (

            <Flex minWidth='max-content' alignItems='left' gap='2' flexDirection='column'>
                <Flex>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<Avatar role='avatarIcon'/>}>
                            {<HamburgerIcon/>}
                        </MenuButton>
                        <MenuList>
                            <MenuItem><Text as='em' fontSize="3xl" role='welcomeNote'>Welcome, {auth.username}!</Text></MenuItem>
                            <MenuItem>
                                <SignOutContainer/>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/signup">
                                    <Button>New User</Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/deleteuser">
                                    <Button>Delete User</Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/forgotpassword">
                                    <Button>Change Password</Button>
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
    );
}