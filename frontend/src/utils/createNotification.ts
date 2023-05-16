import {createStandaloneToast} from "@chakra-ui/react";

export enum StatusOption {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info"  ,
}

export const createNotification = (status: StatusOption, title: string, description: string) => {
    const {toast} = createStandaloneToast()
    toast({
        title: title,
        description: description,
        status: status,
        duration: 9000,
        isClosable: true,
        position: "bottom-right"
    })
}