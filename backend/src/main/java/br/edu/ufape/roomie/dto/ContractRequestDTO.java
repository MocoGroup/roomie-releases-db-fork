package br.edu.ufape.roomie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractRequestDTO {
    private Long chatId;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal price;
}
