import {
    Button,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";


export function TransitionModal({title, message, buttonLabel, handleSecondaryAction, isOpen, onClose, onOpen}: {title: string,
    message: string,
    buttonLabel: string,
    handleSecondaryAction: (event: React.MouseEvent) => void,
    isOpen: boolean,
    onClose: ()=>void,
    onOpen: ()=>void,
}) {

    return (
        <>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {message}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={handleSecondaryAction}
                        >
                            {buttonLabel}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}