package com.example.eshop.ticket.model;

import lombok.*;

import java.io.Serializable;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTicketModel implements Serializable {
    public Long userId;
    public Long productId;
}
