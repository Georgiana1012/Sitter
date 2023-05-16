import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {SignOut} from "./components/SignOut";

export function SignOutContainer() {
    const auth = useAuth();
    const navigate = useNavigate();

    const executeSignOut = async () => {
        const result = await auth.signOut();
        if (result.success) {
            navigate({pathname: "/"});
            createNotification(StatusOption.success, "Signed out", "User signed out!");
            return;
        }
        alert(result.message);
        createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
    };

    return (
        <SignOut onSignOut={executeSignOut}></SignOut>
    );
}
