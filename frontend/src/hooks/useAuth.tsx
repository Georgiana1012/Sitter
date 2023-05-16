import {Amplify, Auth} from "aws-amplify";
import React, {createContext, useContext, useEffect, useState} from "react";
import awsExports from "../aws-exports";


Amplify.configure(awsExports);

interface UseAuth {
    isLoading: boolean;
    isAuthenticated: boolean;
    username: string;
    signIn: (username: string, password: string) => Promise<Result>;
    signOut: () => Promise<Result>;
    signUp: (username: string, password: string, email: string) => Promise<Result>;
    confirmSignUp: (username: string, code: string) => Promise<Result>;
    deleteAccount: () => Promise<Result>;
    updateUserAttributes: (username: string, email: string) => Promise<Result>;
    forgotPassword: (username: string) => Promise<Result>;
    forgotPasswordConfirm:(username: string, code: string, password: string) => Promise<Result>;
    changePassword:(username: string, oldPassword: string, password: string) => Promise<Result>;
}

interface Result {
    success: boolean;
    message: string;
}

type Props = {
    children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                setUsername(result.username);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(() => {
                setUsername("");
                setIsAuthenticated(false);
                setIsLoading(false);
            });
    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            const result = await Auth.signIn(username, password);
            setUsername(result.username);
            setIsAuthenticated(true);
            return { success: true, message: "" };
        } catch (error: any) {
            if(error?.message==="User is not confirmed."){
                return {
                    success: false,
                    message: error.message,
                };
            }
            return {
                success: false,
                message: "LOGIN FAIL",
            };
        }
    };

    const deleteAccount = async () => {
        try {
            const result = await Auth.deleteUser();
            console.log(result);
            return { success: true, message: "" };
        } catch (error: any) {
            return {
                success: false,
                message: "Failed to delete account",
            };
        }
    };

    const updateUserAttributes = async (username?: string, email?: string) => {
        try{
            const result = await Auth.updateUserAttributes(username ,{
                username: username,
                email: email,
            });
            console.log(result);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "Failed to update attributes",
            };
        }
    };

    const forgotPassword = async (username: string) => {
        try{
            const result = await Auth.forgotPassword(username);
            console.log(result);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "Failed to change password",
            };
        }
    };

    const forgotPasswordConfirm = async (username: string, code: string,  password: string) => {
        try {
            const result = await Auth.forgotPasswordSubmit(username, code,  password);
            console.log(result)
            return { success: true, message: "" };
        } catch (error: any) {
            return {
                success: false,
                message: "error",
            };
        }
    };

    const changePassword = async (code: string, oldPassword: string, password: string) => {
        try {
            const result = await Auth.changePassword(code, oldPassword, password);
            console.log(result)
            return { success: true, message: "" };
        } catch (error: any) {
            return {
                success: false,
                message: "PASSWORD CHANGE FAILED",
            };
        }
    };

    const signUp = async (username: string, password: string, email: string) => {
        try{
             const result = await Auth.signUp({
                username: username,
                password,
                attributes: {
                    email
                },
            });
            console.log(result);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "SIGN UP FAILED",
            };
        }
    };

    const confirmSignUp = async (username: string, code: string) => {
        try{
            const result = await Auth.confirmSignUp(username, code);
            console.log(result);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "error",
            };
        }
    };

    const signOut = async () => {
        try {
            await Auth.signOut();
            setUsername("");
            setIsAuthenticated(false);
            return { success: true, message: "" };
        } catch (error) {
            return {
                success: false,
                message: "LOGOUT FAIL",
            };
        }
    };

    return {
        isLoading,
        isAuthenticated,
        username,
        signIn,
        signOut,
        signUp,
        confirmSignUp,
        deleteAccount,
        updateUserAttributes,
        forgotPassword,
        forgotPasswordConfirm,
        changePassword
    };
};