import React from 'react';
import {useNavigate} from "react-router-dom";
import {SignUp} from "./components/SignUp";
import {useAuth} from "../../hooks/useAuth";
import {createNotification, StatusOption} from "../../utils/createNotification";

export function SignUpContainer() {
    const auth = useAuth();
    const navigate = useNavigate();

    const executeSignUp = async (username: string, password: string, email: string) => {
        const result = await auth.signUp(username, password, email);
        if (result.success) {
            navigate({pathname: "/confirm"});
            createNotification(StatusOption.success,"Signed Up","Navigate to confirm!");
            return;
        }
        alert(result.message);
        createNotification(StatusOption.error,"Error", "Found an error. Please try again!");
    };

    return (
        <SignUp onSignUp={executeSignUp}/>
    );
}
