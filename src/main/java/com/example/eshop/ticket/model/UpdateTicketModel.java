package com.example.eshop.ticket.model;

import com.example.eshop.ticket.TicketStatus;
import lombok.*;

import java.io.Serializable;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTicketModel implements Serializable {
    public TicketStatus status;
}
