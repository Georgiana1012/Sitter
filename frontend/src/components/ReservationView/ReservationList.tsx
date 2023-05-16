import React from "react";
import {useGetAllReservationsQuery} from "../../app-redux/apiSlice";
import {NoReservations} from "./NoReservations";
import {ReservationsTable} from "./ReservationsTable";

export function ReservationList():JSX.Element {
    const {
        data: reservationsList = [],
    } = useGetAllReservationsQuery();

    let content: JSX.Element

    content = <>
        {
            reservationsList.length > 0 ? <ReservationsTable reservations={reservationsList}/> : <NoReservations />
        }
    </>
    return content

}