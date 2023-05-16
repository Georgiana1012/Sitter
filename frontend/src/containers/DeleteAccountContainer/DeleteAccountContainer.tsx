import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {DeleteAccount} from "./components/DeleteAccount";

export function DeleteAccountContainer() {
    const auth = useAuth();
    const navigate = useNavigate();

    const executeDeleteAccount = async () => {
        const result = await auth.deleteAccount();
        if (result.success) {
            navigate({pathname: "/"});
            createNotification(StatusOption.success, "Account Deleted", "Sign up a different user");
            return;
        }
        alert(result.message);
        createNotification(StatusOption.error, "Error", "Found an error. Please try again");
    };

    return (
        <DeleteAccount onDeleteAccount={executeDeleteAccount}></DeleteAccount>
    );
}
