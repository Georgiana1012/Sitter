import "./Home.css"
import {Button, Image} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import React from "react";
import {useAuth} from "../../hooks/useAuth";

export function Home():JSX.Element {
    const auth = useAuth();

    let content: JSX.Element

    content = <div className='body'>
        <div className='paragraph-1'>
            <h1 className='text-2'>
                Lorem ipsum
            </h1>
            <p className='text-1'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div> {
                auth.isAuthenticated ? <Button colorScheme='blue'
                                               size="lg"
                                               marginTop="20px"
                >
                    <Link to ="/booking" >Book a table</Link>
                </Button> : <Button colorScheme='blue'
                                    size="lg"
                                    marginTop="20px"
                >
                    <Link to ="/topPage" >Book a table</Link>
                </Button>
            }

            </div>
        </div>
        <div className='image'>
            <Image src='https://images.pexels.com/photos/16264508/pexels-photo-16264508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' />
        </div>
    </div>

    return content

}