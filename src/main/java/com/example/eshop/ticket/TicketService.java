package com.example.eshop.ticket;

import com.example.eshop.ticket.exception.TicketNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    public List<Ticket> getAll() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getByUser(long userId) {
        return ticketRepository.findByUser(userId);
    }

    public List<Ticket> getByStatus(TicketStatus status) {
        return ticketRepository.findByStatus(status);
    }

    public Optional<Ticket> getById(long id) {
        return ticketRepository.findById(id);
    }

    public Ticket add(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Optional<Long> delete(long id) {
        var ticketToDeleteOptional = ticketRepository.findById(id);
        if(ticketToDeleteOptional.isEmpty())
            throw new TicketNotFoundException("Ticket with id " + id + " does not exists");

        ticketRepository.deleteById(id);
        return Optional.of(id);
    }

    public Optional<Ticket> updateStatus(long id, TicketStatus status) {
        var ticketToUpdateOptional = ticketRepository.findById(id);
        if(ticketToUpdateOptional.isEmpty())
            throw new TicketNotFoundException("Ticket with id " + id + " does not exists");

        var ticketToUpdate = ticketToUpdateOptional.get();
        ticketToUpdate.setStatus(status);
        return Optional.of(ticketRepository.save(ticketToUpdate));
    }
}
