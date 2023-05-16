package com.example.demo.service;

import com.example.demo.dto.ReservationDTO;
import com.example.demo.entity.Reservation;
import com.example.demo.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    ModelMapper modelMapper;

    public ReservationDTO convertToDTO(Reservation reservation) {
        ReservationDTO reservationDTO = new ReservationDTO();

        reservationDTO.setId(reservation.getId());
        reservationDTO.setReservationDate(reservation.getReservationDate());
        reservationDTO.setReservationHour(reservation.getReservationHour());
        reservationDTO.setReservationName(reservation.getReservationName());
        reservationDTO.setReservationSurname(reservation.getReservationSurname());
        reservationDTO.setDeleted(reservation.getDeleted());
        reservationDTO.setPhoneNumber(reservation.getPhoneNumber());

        return reservationDTO;
    }

    public ReservationDTO convertEntityToDTO(Reservation entity) {
        var dto = new ReservationDTO();
        dto = modelMapper.map(entity, ReservationDTO.class);
        return dto;
    }

    public Reservation convertToEntity(ReservationDTO dto) {
        Reservation reservation = new Reservation();
        reservation.setId(dto.getId());
        reservation.setReservationDate(dto.getReservationDate());
        reservation.setReservationHour(dto.getReservationHour());
        reservation.setReservationName(dto.getReservationName());
        reservation.setReservationSurname(dto.getReservationSurname());
        reservation.setDeleted(dto.getDeleted());
        reservation.setPhoneNumber(dto.getPhoneNumber());

        return reservation;
    }

    public List<ReservationDTO> convertListToDTO(List<Reservation> entityList) {
        return entityList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Reservation save(ReservationDTO dto) {
       return reservationRepository.save(convertToEntity(dto));
    }

    public Reservation edit(Long id, ReservationDTO dto) {
        Optional<Reservation> optional= reservationRepository.findById(id);
        if(optional.isPresent()) {
            Reservation reservation = optional.get();
            reservation.setReservationDate(dto.getReservationDate());
            reservation.setReservationHour(dto.getReservationHour());
            reservation.setReservationName(dto.getReservationName());
            reservation.setReservationSurname(dto.getReservationSurname());
            reservation.setDeleted(dto.getDeleted());
            reservation.setPhoneNumber(dto.getPhoneNumber());
            return reservationRepository.save(reservation);
        }

        return null;
    }

    public Reservation findById(Long id) {
        Optional<Reservation> optional= reservationRepository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    public ReservationDTO findDtoById(Long id) {
        return convertToDTO(findById(id));
    }

    public List<Reservation> getAllByPhoneNumber(String phoneNumber) {
        Optional<List<Reservation>> optional= reservationRepository.findAllByPhoneNumber(phoneNumber);
        if(optional.isPresent()) {
            return optional.get();
        }
        return new ArrayList<>();
    }

    public void delete(Long id) {
        if(findById(id) != null) {
            Reservation reservation = findById(id);
            reservation.setDeleted(true);
            reservationRepository.save(reservation);
        }
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }
}
