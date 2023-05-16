// import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {ForgotPassword} from "./components/ForgotPassword";


export function ForgotPasswordContainer() {
    const auth = useAuth();
    const navigate = useNavigate();

    const executeForgotPassword = async (username: string) => {
        const result = await auth.forgotPassword(username);
        if (result.success) {
            navigate({pathname: "/confirmForgotPassword"});
            createNotification(StatusOption.success, "Change your password!", "Welcome!.");
            return;
        }
        alert(result.message);
        createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
    };

    return (
        <ForgotPassword onForgotPassword={executeForgotPassword}/>
    );
}
