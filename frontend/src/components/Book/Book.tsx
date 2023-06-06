import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Select,
    Input,
    Spacer,
    Stack,
    VStack,
    HStack, FormErrorMessage,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {ReservationDTO, useCreateReservationMutation} from "../../app-redux/apiSlice";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {Auth} from "aws-amplify";
import {
    getValidationFieldErrorsName,
    ValidationError,
} from "../../utils/getValidationFieldErrorName";
import {getValidationFieldErrorsSurname} from "../../utils/getValidationFieldErrorSurname";

export function Book(): JSX.Element {
    let content: JSX.Element;

    const [username, setUsername] = useState('');

    useEffect(() => {
        async function getUsername() {
            const user = await Auth.currentAuthenticatedUser();
            setUsername(user.username);
        }

        getUsername();
    }, []);

    const [bookButtonDisabled, setBookButtonDisabled] = useState(true)
    const [date, setDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [createReservation] = useCreateReservationMutation();

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleReservationTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setReservationTime(event.target.value);
    };

    const [validationFieldErrors, setValidationFieldErrors] = useState<ValidationError[]>([]);

    let isErrorName = false;

    const errorName = validationFieldErrors.find(((object: ValidationError) => {
        isErrorName = true;
        return object.field === 'firstName';
    }));

    let isErrorSurname = false;

    const errorSurname = validationFieldErrors.find(((object: ValidationError) => {
        isErrorSurname = true;
        return object.field === 'lastName';
    }));

    const validateFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const fieldName = e.target.name;

        if (fieldName === "firstName") {
            setName(value);
            setValidationFieldErrors(getValidationFieldErrorsName(value, validationFieldErrors));
        }

        if (fieldName === "lastName") {
            setSurname(value);
            setValidationFieldErrors(getValidationFieldErrorsSurname(value, validationFieldErrors));
        }
    }

    useEffect(() => {
        if (validationFieldErrors.length > 0 || !name || !surname) {
            setBookButtonDisabled(true);
            return
        }
        setBookButtonDisabled(false);
    }, [validationFieldErrors.length, name, surname])

    const submitHandler = async () => {

        if (date) {
            const reservation: ReservationDTO = {
                username: username,
                reservationDate: date,
                reservationHour: reservationTime,
                reservationName: name,
                reservationSurname: surname,
                phoneNumber: phone,
            }
            createReservation(reservation)
                .unwrap()
                .then(() => {
                    createNotification(StatusOption.success, "Yayyy", "You made a new reservation!");
                })
                .catch(() => {
                    createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
                })
        }
    }
    console.log(errorName)
    content = <>
        <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
            <VStack h={500} justify="center">
                <form noValidate>
                        <HStack>
                            <FormControl isInvalid={isErrorName}>
                                    <FormLabel htmlFor="name">First Name</FormLabel>
                                    <Input
                                        type="firstName"
                                        value={name}
                                        name="firstName"
                                        placeholder="First Name"
                                        size="lg"
                                        onChange={validateFormValues}
                                    />
                                    {errorName && <FormErrorMessage> {errorName.message} </FormErrorMessage>}
                            </FormControl>
                            <Spacer height="10px"/>
                            <FormControl isInvalid={isErrorSurname}>
                                <FormLabel htmlFor="name">Last Name</FormLabel>
                                <Input
                                    type="lastName"
                                    value={surname}
                                    name="lastName"
                                    placeholder="Last Name"
                                    size="lg"
                                    onChange={validateFormValues}
                                />
                                {errorSurname && <FormErrorMessage> {errorSurname.message} </FormErrorMessage>}
                            </FormControl>
                        </HStack>
                    <Spacer height="20px"/>
                    <FormControl>
                        <HStack>
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <Spacer height="10px"/>
                            <Input
                                type="date"
                                name="date"
                                colorScheme="dark"
                                placeholder="Date"
                                size="lg"
                                min={new Date().toISOString().split('T')[0]}
                                onChange={handleStartDateChange}
                            />
                            <FormLabel htmlFor="time">Time</FormLabel>
                            <Spacer height="10px"/>
                            <Select placeholder='Time'
                                    value={reservationTime}
                                    onChange={handleReservationTime}
                            >
                                <option value='16:00'>16:00</option>
                                <option value='18:00'>18:00</option>
                                <option value='20:00'>20:00</option>
                            </Select>
                        </HStack>
                    </FormControl>
                    <Spacer height="20px"/>
                    <FormControl>
                        <HStack>
                            <FormLabel htmlFor="number">Phone Number</FormLabel>
                            <Input
                                type="number"
                                value={phone}
                                name="phoneNumber"
                                placeholder="Please enter your phone number"
                                size="lg"
                                onChange={(event) => (setPhone(event.target.value))}
                            />
                        </HStack>
                    </FormControl>
                    <Spacer height="35px"/>
                    <Stack align="center">
                        <Button colorScheme='blue'
                                onClick={submitHandler}
                                size="lg"
                                isDisabled={bookButtonDisabled}
                                marginTop="20px">
                            Send Reservation
                        </Button>
                    </Stack>
                </form>
            </VStack>
        </Flex>
    </>
    return content;
}