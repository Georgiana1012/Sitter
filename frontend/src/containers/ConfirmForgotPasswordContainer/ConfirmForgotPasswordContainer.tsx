import React from 'react';
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {createNotification, StatusOption} from "../../utils/createNotification";
import ConfirmForgotPassword from "./components/ConfirmForgotPassword";

export function ConfirmForgotPasswordContainer() {
    const auth = useAuth();
    const navigate = useNavigate();

    const executeConfirmForgotPassword = async (username: string, code: string, password: string,) => {
        const result = await auth.forgotPasswordConfirm(username, code, password);
        if (result.success) {
            navigate({pathname: "/signin"});
            createNotification(StatusOption.success, "You are now signed up", "Welcome! Please sign in.");
            return;
        }
        alert(result.message);
        createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
    };

    return (
        <ConfirmForgotPassword onConfirmForgotPassword={executeConfirmForgotPassword}/>
    );
}
