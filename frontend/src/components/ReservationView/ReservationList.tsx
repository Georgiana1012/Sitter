import React, {useEffect, useState} from "react";
import {ReservationDTO, useGetReservationsForUserQuery} from "../../app-redux/apiSlice";
import {NoReservations} from "./NoReservations";
import {ReservationsTable} from "./ReservationsTable";
import {Auth} from "aws-amplify";

export function ReservationList():JSX.Element {

    const [username, setUsername] = useState('');

    const {
        data: reservationsList = [],
    } = useGetReservationsForUserQuery(username,{
        skip: !username
    });

    useEffect(() => {
        async function getUsername() {
            const user = await Auth.currentAuthenticatedUser();
            setUsername(user.username);
        }

        getUsername();
    }, []);

    let content: JSX.Element

    content = <>
        {
            reservationsList.length > 0 ? <ReservationsTable reservations={reservationsList}/> : <NoReservations />
        }
    </>
    return content

}