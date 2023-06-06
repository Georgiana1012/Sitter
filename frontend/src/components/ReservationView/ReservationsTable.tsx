import {Button, Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import {Th} from "@chakra-ui/react";
import {ReservationDTO, useDeleteReservationMutation} from "../../app-redux/apiSlice";
import {Link} from "react-router-dom";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import dayjs from "dayjs";

export function ReservationsTable({reservations}: {
    reservations: ReservationDTO[];
}): JSX.Element {

    const [deleteReservation] = useDeleteReservationMutation();

    let content: JSX.Element

    content = <>
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>
                    <Link to="/booking">
                        <Button>Create a new booking</Button>
                    </Link>
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Surname</Th>
                        <Th>Date</Th>
                        <Th>Time</Th>
                        <Th>Phone</Th>
                        <Th>Delete</Th>
                        <Th>Modify</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        reservations.map((booking: ReservationDTO) => {
                            const reservation: ReservationDTO = {
                                id: booking.id,
                                reservationDate: booking.reservationDate,
                                reservationName: booking.reservationName,
                                reservationSurname: booking.reservationSurname,
                                reservationHour: booking.reservationHour,
                                phoneNumber: booking.phoneNumber,
                            }

                            const handleDelete = () => (
                                deleteReservation(reservation)
                            )

                            return (

                                <Tr>
                                    <Td>{reservation.reservationName}</Td>
                                    <Td>{reservation.reservationSurname}</Td>
                                    <Td>{dayjs(reservation.reservationDate).format("d MMM YYYY")}</Td>
                                    <Td>{reservation.reservationHour}</Td>
                                    <Td>{reservation.phoneNumber}</Td>
                                    <Td>
                                        <Button onClick={handleDelete}>
                                            <DeleteIcon/>
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Link
                                            to={`/editbooking/${reservation.id}`}
                                        >
                                            <Button>
                                                <EditIcon/>
                                            </Button>
                                        </Link>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </>
    return content

}