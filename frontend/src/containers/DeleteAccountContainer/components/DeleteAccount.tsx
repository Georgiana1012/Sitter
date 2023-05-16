import React, {useState} from 'react';
import {Button, Flex, useDisclosure} from "@chakra-ui/react";
import {TransitionModal} from "../../../components/TransitionModal/TransitionModal";

export type DeleteAccountProps = {
    onDeleteAccount: () => void;
}

export function DeleteAccount({ onDeleteAccount }: DeleteAccountProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteAccount = (event: React.MouseEvent) => {
        event.preventDefault();
        onDeleteAccount();
    }

    return (<>
            <Flex  justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
                <Button
                    onClick={onOpen}
                    colorScheme='blue'
                    size="lg"
                    variant = 'outline'
                    marginTop="20px"
                >
                    Delete Account
                </Button>
                <TransitionModal
                    title="Confirm Delete Account"
                    message="Are you sure you want to delete your account?"
                    buttonLabel="Yes, delete my account"
                    handleSecondaryAction={handleDeleteAccount}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                ></TransitionModal>
            </Flex>

        </>
    );
}
