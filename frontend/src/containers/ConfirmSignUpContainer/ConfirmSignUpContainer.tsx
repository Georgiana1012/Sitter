import React from 'react';
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {createNotification, StatusOption} from "../../utils/createNotification";
import ConfirmSignUp from "./components/ConfirmSignUp";

export function ConfirmSignUpContainer() {
    const auth = useAuth();
    const navigate = useNavigate();

    const executeConfirmSignUp = async (username: string, code: string) => {
        const result = await auth.confirmSignUp(username, code);
        if (result.success) {
            navigate({pathname: "/signin"});
            createNotification(StatusOption.success, "You are now signed up", "Welcome! Please sign in.");
            return;
        }
        alert(result.message);
        createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
    };

    return (
        <ConfirmSignUp onConfirmSignUp={executeConfirmSignUp}/>
    );
}
