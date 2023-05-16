
import { createApi } from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from "@reduxjs/toolkit/query";


export type ReservationDTO = {
    id?: string;
    reservationDate: string;
    reservationHour: string;
    reservationName: string;
    reservationSurname: string;
    phoneNumber: string;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/reservation', headers: {
        "Content-Type": "application/json"
        } }),
    tagTypes: [
        'ReservationDTO',
    ],
    endpoints: builder => ({
        getAllReservations: builder.query<ReservationDTO[], void>({
            query: () =>
                `/getAll`,
        }),
        getReservation: builder.query<ReservationDTO, number>({
            query: id =>
                `/getReservation/${id}`,
        }),
        deleteReservation: builder.mutation<ReservationDTO, ReservationDTO>({
            query: ({ ...reservation }) => ({
                url: `/delete/${reservation.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ReservationDTO'],
        }),
        createReservation: builder.mutation<
            ReservationDTO,
            ReservationDTO | { error: string }
            >({
            query: ({ ...reservation }) => ({
                url: `/save`,
                method: 'POST',
                body: JSON.stringify(reservation),
            }),
            invalidatesTags: ['ReservationDTO'],
        }),
        editReservation: builder.mutation<ReservationDTO, ReservationDTO>({
            query: ({ ...body }) => ({
                url: `/edit/${body.id}`,
                method: 'PUT',
                body: JSON.stringify(body),
            }),
            invalidatesTags: ['ReservationDTO'],
        }),
    }),
});

export const {
    useGetAllReservationsQuery,
    useGetReservationQuery,
    useEditReservationMutation,
    useDeleteReservationMutation,
    useCreateReservationMutation
} = apiSlice;



