package com.example.eshop.ticket;

import com.example.eshop.product.ProductService;
import com.example.eshop.ticket.model.CreateTicketModel;
import com.example.eshop.ticket.model.UpdateTicketModel;
import com.example.eshop.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/tickets")
@AllArgsConstructor
public class TicketsController {
    private final TicketService ticketService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAll();
    }

    @GetMapping(":byStatus")
    public List<Ticket> getByStatus(@Param("status") TicketStatus status) {
        return ticketService.getByStatus(status);
    }

    @GetMapping(":pick")
    public ResponseEntity<String> pickOne() {
        return ticketService.getByStatus(TicketStatus.APPROVED).stream().findFirst()
                .map(ticket -> ResponseEntity.ok().body(ticket.getLocation()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(":pickAndProcess")
    public ResponseEntity<String> pickOneAndProcess() {
        var ticketOptional = ticketService.getByStatus(TicketStatus.APPROVED).stream().findFirst();
        if (ticketOptional.isPresent()) {
            var ticket = ticketOptional.get();
            ticketService.updateStatus(ticket.getId(), TicketStatus.PROCESSING);
            return ResponseEntity.ok().body(ticket.getLocation());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(":byUser")
    public List<Ticket> getByUser(@Param("userId") String userId) {
        return ticketService.getByUser(Long.parseLong(userId));
    }

    @GetMapping("{ticketId}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable("ticketId") String ticketId) {
        return ticketService.getById(Long.parseLong(ticketId))
                .map(ticket -> ResponseEntity.ok().body(ticket))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ticket> addTicket(@Valid @RequestBody CreateTicketModel ticketModel) {
        var user = userService.getById(ticketModel.userId);
        if (user.isEmpty()) return ResponseEntity.notFound().build();

        var product = productService.getById(ticketModel.productId);
        if (product.isEmpty()) return ResponseEntity.notFound().build();

        var ticket = new Ticket(user.get(), product.get(), product.get().getPrice(), TicketStatus.CREATED);
        var savedTicket = ticketService.add(ticket);
        log.info("Created Ticket Id:" + savedTicket.getId());
        return ResponseEntity.ok(savedTicket);
    }

    @PutMapping("{ticketId}")
    public ResponseEntity<Ticket> updateStatus(@PathVariable("ticketId") String ticketId, @RequestBody UpdateTicketModel ticketModel) {
        var response = ticketService.updateStatus(Long.parseLong(ticketId), ticketModel.status)
                .map(updatedTicket -> ResponseEntity.ok().body(updatedTicket))
                .orElseGet(() -> ResponseEntity.notFound().build());
        log.info("Updated Ticket Id:" + ticketId);
        return response;
    }

    @DeleteMapping("{ticketId}")
    public ResponseEntity<Long> deleteTicket(@PathVariable("ticketId") String ticketId) {
        var response = ticketService.delete(Long.parseLong(ticketId))
                .map(deletedTicketId -> ResponseEntity.ok().body(deletedTicketId))
                .orElseGet(() -> ResponseEntity.notFound().build());
        log.info("Deleted Ticket Id:" + ticketId);
        return response;
    }
}
