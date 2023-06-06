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
import React, {useEffect, useState} from "react";
import {
    ReservationDTO,
    useCreateReservationMutation,
    useEditReservationMutation,
    useGetReservationQuery
} from "../../app-redux/apiSlice";
import {useParams} from "react-router-dom";
import {createNotification, StatusOption} from "../../utils/createNotification";
import {Auth} from "aws-amplify";

export function EditBooking(): JSX.Element {
    let content: JSX.Element;

    const [date, setDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const [phone, setPhone] = useState("");
    // const [numberOfPeople, setNumberOfPeople] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function getUsername() {
            const user = await Auth.currentAuthenticatedUser();
            setUsername(user.username);
        }

        getUsername();
    }, []);

    const {reservationID} = useParams();

    console.log(reservationID)

    const { data: reservationDTO } = useGetReservationQuery(
        Number(reservationID) || 0,
    );

    const [editReservation] = useEditReservationMutation();

    useEffect( () => {
        if(reservationDTO){
            setName(reservationDTO.reservationName)
            setPhone(reservationDTO.phoneNumber)
            setSurname(reservationDTO.reservationSurname)
            setReservationTime(reservationDTO.reservationHour)
            setDate(reservationDTO.reservationDate)
        }
    }, [reservationDTO]
    )

    const updateHandler = async () => {
        if(date){
            const reservation: ReservationDTO ={
                id: reservationID,
                username: username,
                reservationDate: date,
                reservationHour: reservationTime,
                reservationName: name,
                reservationSurname: surname,
                phoneNumber: phone,
            }

            await editReservation(reservation)
                .unwrap()
                .then(() => {
                    createNotification(StatusOption.success, "Yayyy", "You edited this reservation!");
                    resetForm()
                })
                .catch(()=>{
                    createNotification(StatusOption.error, "Error", "Found an error. Please try again!");
                })
        }
    }

    const resetForm = () => {
        setName('')
        setPhone('')
        setSurname('')
        setReservationTime('')
        setDate('')
    }

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleReservationTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setReservationTime(event.target.value);
    };

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
                                onChange={(event: any)=>(setName(event.target.value))}
                            />
                            <Spacer height="10px"/>
                            <FormLabel htmlFor="name">Last Name</FormLabel>
                            <Input
                                type="lastName"
                                value={surname}
                                name="lastName"
                                placeholder="Last Name"
                                size="lg"
                                onChange={(event: any)=>(setSurname(event.target.value))}
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
                                onChange={(event: any)=>(setPhone(event.target.value))}
                            />
                        </HStack>
                    </FormControl>
                    <Spacer height="35px"/>
                    <Stack align="center">
                        <Button  colorScheme='blue'
                                 onClick={updateHandler}
                                 size="lg"
                                 marginTop="20px">
                            Edit Reservation
                        </Button>
                    </Stack>
                </form>
            </VStack>
        </Flex>
    </>
    return content;
}