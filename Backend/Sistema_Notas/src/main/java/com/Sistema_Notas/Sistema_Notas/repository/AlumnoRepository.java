package com.Sistema_Notas.Sistema_Notas.repository;

import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    List<Alumno> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase
            (
            String nombre,
            String apellido
    );

    boolean existsByCodigo(String codigo);

    boolean existsByEmail(String email);
}
