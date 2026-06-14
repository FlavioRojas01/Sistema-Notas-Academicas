package com.Sistema_Notas.Sistema_Notas.repository;

import com.Sistema_Notas.Sistema_Notas.dto.PromedioAlumnoDTO;
import com.Sistema_Notas.Sistema_Notas.dto.PromedioAsignaturaDTO;
import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import com.Sistema_Notas.Sistema_Notas.entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {

    List<Nota> findByAlumnoId(Long alumnoId);

    List<Nota> findByAsignaturaId(Long asignaturaId);

    boolean existsByAlumnoIdAndAsignaturaIdAndFecha(
            Long alumnoId,
            Long asignaturaId,
            LocalDate fecha);

    // PROMEDIO DE UN ALUMNO
    @Query("""
           SELECT AVG(n.nota)
           FROM Nota n
           WHERE n.alumno.id = :id
           """)
    Double obtenerPromedioAlumno(
            @Param("id") Long id);

    // PROMEDIO GENERAL
    @Query("""
           SELECT AVG(n.nota)
           FROM Nota n
           """)
    Double promedioGeneral();

    // NOTA MÁS ALTA
    @Query("""
           SELECT MAX(n.nota)
           FROM Nota n
           """)
    Double notaMasAlta();

    // ALUMNOS EN RIESGO
    @Query("""
           SELECT a
           FROM Alumno a
           WHERE (
               SELECT AVG(n.nota)
               FROM Nota n
               WHERE n.alumno = a
           ) < 11
           """)
    List<Alumno> alumnosEnRiesgo();

    @Query("""
SELECT new com.Sistema_Notas.Sistema_Notas.dto.PromedioAlumnoDTO(
       CONCAT(a.nombre,' ',a.apellido),
       AVG(n.nota)
)
FROM Nota n
JOIN n.alumno a
GROUP BY a.id,a.nombre,a.apellido
""")
    List<PromedioAlumnoDTO> obtenerPromediosPorAlumno();

    @Query("""
SELECT new com.Sistema_Notas.Sistema_Notas.dto.PromedioAsignaturaDTO(
       a.nombre,
       AVG(n.nota)
)
FROM Nota n
JOIN n.asignatura a
GROUP BY a.id,a.nombre
""")
    List<PromedioAsignaturaDTO>
    obtenerPromediosPorAsignatura();
}
