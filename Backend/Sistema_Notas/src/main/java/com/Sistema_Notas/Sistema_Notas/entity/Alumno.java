package com.Sistema_Notas.Sistema_Notas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "alumnos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    @Column(unique = true)
    private String codigo;

    @Column(unique = true)
    private String email;


}
