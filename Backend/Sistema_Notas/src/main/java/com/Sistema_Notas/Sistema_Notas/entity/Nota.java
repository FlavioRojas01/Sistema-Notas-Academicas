package com.Sistema_Notas.Sistema_Notas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "notas", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "alumno_id",
                "asignatura_id",
                "fecha"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "alumno_id")
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "asignatura_id")
    private Asignatura asignatura;

    private BigDecimal nota;

    private LocalDate fecha;

    private String observacion;

}
