package com.Sistema_Notas.Sistema_Notas.repository;

import com.Sistema_Notas.Sistema_Notas.entity.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {

    boolean existsByNombre(String nombre);

}
