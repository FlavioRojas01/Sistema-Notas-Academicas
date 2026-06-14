package com.Sistema_Notas.Sistema_Notas.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class NotaDTO {

    private Long alumnoId;

    private Long asignaturaId;

    @DecimalMin(value = "0")
    @DecimalMax(value = "20")
    private BigDecimal nota;

    private LocalDate fecha;

    private String observacion;

}
