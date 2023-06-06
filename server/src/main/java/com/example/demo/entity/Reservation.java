package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import java.util.Date;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "RESERVATIONS")
@Where(clause = "DELETED IS FALSE OR DELETED IS NULL")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservations_id_seq")
    @SequenceGenerator(name = "reservations_id_seq", sequenceName = "reservations_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "RESERVATION_DATE")
    private Date reservationDate;

    @Column(name = "RESERVATION_HOUR")
    private String reservationHour;

    @Column(name = "RESERVATION_NAME")
    private String reservationName;

    @Column(name = "RESERVATION_SURNAME")
    private String reservationSurname;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    @Column(name = "DELETED")
    private Boolean deleted;
}
