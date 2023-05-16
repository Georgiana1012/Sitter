import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {SignIn} from "./components/SignIn";


export function SignInContainer() {
        const auth = useAuth();
        const navigate = useNavigate();

        const executeSignIn = async (username: string, password: string) => {
            const result = await auth.signIn(username, password);
            if (result.success) {
                navigate({pathname: "/reservationList"});
                createNotification(StatusOption.success, "You are now signed in", "Welcome!.");
                return;
            }
            alert(result.message);
            createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
        };

        return (
            <SignIn onSignIn={executeSignIn}/>
        );
}
