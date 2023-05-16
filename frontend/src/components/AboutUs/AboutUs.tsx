import React from "react";
import {Text, Image} from "@chakra-ui/react";
import './AboutUs.css'

export function AboutUs(): JSX.Element {
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
            </div>
            <div className='image'>
                <Image src='https://images.pexels.com/photos/4350059/pexels-photo-4350059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
            </div>
        </div>;
    return content;
}