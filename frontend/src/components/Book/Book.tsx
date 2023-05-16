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
    HStack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {ReservationDTO, useCreateReservationMutation} from "../../app-redux/apiSlice";
import {createNotification, StatusOption} from "../../utils/createNotification";

export function Book(): JSX.Element {
    let content: JSX.Element;

    const [date, setDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const [phone, setPhone] = useState("");
    // const [numberOfPeople, setNumberOfPeople] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [createReservation] = useCreateReservationMutation();

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handlePhoneNumber = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPhone(event.target.value);
    };

    const handleReservationTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setReservationTime(event.target.value);
    };

    const submitHandler = async () => {

        if(date){
            const reservation: ReservationDTO ={
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
                .catch(()=>{
                    createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
                })
        }
    }

    content =  <>
        <Flex justify={"center"} backgroundColor="#001f3d" color="white" h="100vh">
            <VStack h={500} justify="center">
                <form noValidate>
                    <FormControl>
                        <HStack>
                            <FormLabel htmlFor="name">First Name</FormLabel>
                            <Input
                                type="firstName"
                                value={name}
                                name="firstName"
                                placeholder="First Name"
                                size="lg"
                                onChange={(event)=>(setName(event.target.value))}
                            />
                            <Spacer height="10px"/>
                            <FormLabel htmlFor="name">Last Name</FormLabel>
                            <Input
                                type="lastName"
                                value={surname}
                                name="lastName"
                                placeholder="Last Name"
                                size="lg"
                                onChange={(event)=>(setSurname(event.target.value))}
                            />
                        </HStack>
                    </FormControl>
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
                    {/*<FormControl >*/}
                    {/*    <HStack>*/}
                    {/*        <FormLabel htmlFor="number">Number of People</FormLabel>*/}
                    {/*        <Select placeholder='How big should your reservation be?'>*/}
                    {/*            <option value='option1'>2</option>*/}
                    {/*            <option value='option2'>3</option>*/}
                    {/*            <option value='option3'>4</option>*/}
                    {/*            <option value='option3'>5</option>*/}
                    {/*            <option value='option3'>6</option>*/}
                    {/*        </Select>*/}
                    {/*    </HStack>*/}
                    {/*</FormControl>*/}
                    <Spacer height="20px"/>
                    <FormControl >
                        <HStack>
                            <FormLabel htmlFor="number">Phone Number</FormLabel>
                            <Input
                                type="number"
                                value={phone}
                                name="phoneNumber"
                                placeholder="Please enter your phone number"
                                size="lg"
                                onChange={(event)=>(setPhone(event.target.value))}
                            />
                        </HStack>
                    </FormControl>
                    <Spacer height="35px"/>
                    <Stack align="center">
                        <Button  colorScheme='blue'
                                onClick={submitHandler}
                                size="lg"
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