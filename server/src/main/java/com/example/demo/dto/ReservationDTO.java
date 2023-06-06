package com.example.demo.dto;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ReservationDTO implements Serializable {

    private Long id;
    private String username;
    private Date reservationDate;
    private String reservationHour;
    private String reservationName;
    private String reservationSurname;
    private String phoneNumber;
    private Boolean deleted;
}
