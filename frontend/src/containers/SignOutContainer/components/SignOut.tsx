import React from 'react';
import {Button} from "@chakra-ui/react";

export type SignOutProps = {
    onSignOut: () => void;
}

export function SignOut({ onSignOut }: SignOutProps) {

    const handleSignOut = (event: React.MouseEvent) => {
        event.preventDefault();
        onSignOut();
    }

    return (<Button
            onClick={handleSignOut}
        >
            Log Out
        </Button>
    );
}
