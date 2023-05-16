import React from "react";
import {Box, Image, Text} from "@chakra-ui/react";
import './ContactUs.css';
import {ReservationList} from "../ReservationView/ReservationList";

export function ContactUs(): JSX.Element {
    let content: JSX.Element;
    content =
        <div className='body'>
            <div className='paragraph-1'>
                <Text className='text-2'> Lorem ipsum dolor sit amet</Text>
                <Text className='text-1'> Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur
                </Text>
                <Box className='box-contact'>
                     Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur
                </Box>
            </div>
            <div className='image'>
                <Image src='https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
            </div>
            <ReservationList />
        </div>
    return content;
}