package com.example.eshop.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("" +
            "SELECT t FROM Ticket t " +
            "WHERE t.status = ?1"
    )
    List<Ticket>  findByStatus(TicketStatus status);

    @Query("" +
            "SELECT t FROM Ticket t " +
            "WHERE t.user.id = ?1"
    )
    List<Ticket> findByUser(Long userId);
}
