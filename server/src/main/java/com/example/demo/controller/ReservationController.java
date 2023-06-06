package com.example.demo.controller;

import com.example.demo.dto.ReservationDTO;
import com.example.demo.entity.Reservation;
import com.example.demo.service.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false")
@Controller
@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping(path = "/save")
    @ResponseBody
    public ResponseEntity<Reservation> save(@RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation reservation = reservationService.save(reservationDTO);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Cannot save because of: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping(path = "/getReservation")
    public ResponseEntity<List<Reservation>> getReservationsByPhoneNumber(@RequestBody String phoneNumber) {
        try {
            List<Reservation> reservationList = reservationService.getAllByPhoneNumber(phoneNumber);
            return new ResponseEntity<>(reservationList, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Cannot get because of: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/getReservation/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable("id") Integer id) {

        ReservationDTO reservationDTO = reservationService.convertEntityToDTO(reservationService.findById(id.longValue()));
        if (reservationDTO == null) {
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity<>(reservationDTO, HttpStatus.OK);
    }

    @PutMapping(path = "/edit/{id}")
    public ResponseEntity<Reservation> editReservation(@PathVariable("id") Long id, @RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation reservation = reservationService.edit(id, reservationDTO);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Cannot edit because of: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            reservationService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error("Cannot delete because of: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Reservation>> getAll(){
        try {
            List<Reservation> list = reservationService.findAll();
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Cannot getAll because of: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getReservationsForUser/{username}")
    public ResponseEntity<List<Reservation>> getReservationForUser(@PathVariable("username") String username){
        try {
            List<Reservation> list = reservationService.getByUsername(username);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Cannot getAll because of: " + e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
