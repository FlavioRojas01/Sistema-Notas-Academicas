package com.Sistema_Notas.Sistema_Notas.service;

import com.Sistema_Notas.Sistema_Notas.dto.NotaDTO;
import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import com.Sistema_Notas.Sistema_Notas.entity.Asignatura;
import com.Sistema_Notas.Sistema_Notas.entity.Nota;
import com.Sistema_Notas.Sistema_Notas.exception.NotaDuplicadaException;
import com.Sistema_Notas.Sistema_Notas.repository.AlumnoRepository;
import com.Sistema_Notas.Sistema_Notas.repository.AsignaturaRepository;
import com.Sistema_Notas.Sistema_Notas.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {

    private final NotaRepository notaRepository;
    private final AlumnoRepository alumnoRepository;
    private final AsignaturaRepository asignaturaRepository;

    public NotaService(
            NotaRepository notaRepository,
            AlumnoRepository alumnoRepository,
            AsignaturaRepository asignaturaRepository) {

        this.notaRepository = notaRepository;
        this.alumnoRepository = alumnoRepository;
        this.asignaturaRepository = asignaturaRepository;
    }

    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    public Nota buscarPorId(Long id) {
        return notaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Nota no encontrada"));
    }

    public Nota guardar(NotaDTO dto) {

        if (
                notaRepository
                        .existsByAlumnoIdAndAsignaturaIdAndFecha(
                                dto.getAlumnoId(),
                                dto.getAsignaturaId(),
                                dto.getFecha()
                        )
        ) {

            throw new NotaDuplicadaException(
                    "Ya existe una nota registrada para este alumno en esa asignatura y fecha"
            );
        }

        Alumno alumno =
                alumnoRepository.findById(dto.getAlumnoId())
                        .orElseThrow();

        Asignatura asignatura =
                asignaturaRepository.findById(dto.getAsignaturaId())
                        .orElseThrow();

        Nota nota = new Nota();

        nota.setAlumno(alumno);
        nota.setAsignatura(asignatura);
        nota.setNota(dto.getNota());
        nota.setFecha(dto.getFecha());
        nota.setObservacion(dto.getObservacion());

        return notaRepository.save(nota);
    }

    public Nota actualizar(
            Long id,
            NotaDTO dto) {

        Nota nota =
                buscarPorId(id);

        Alumno alumno =
                alumnoRepository
                        .findById(dto.getAlumnoId())
                        .orElseThrow();

        Asignatura asignatura =
                asignaturaRepository
                        .findById(dto.getAsignaturaId())
                        .orElseThrow();

        nota.setAlumno(alumno);
        nota.setAsignatura(asignatura);
        nota.setNota(dto.getNota());
        nota.setFecha(dto.getFecha());
        nota.setObservacion(dto.getObservacion());

        return notaRepository.save(nota);
    }


    public void eliminar(Long id) {
        notaRepository.deleteById(id);
    }

    public List<Nota> obtenerPorAlumno(Long id) {
        return notaRepository.findByAlumnoId(id);
    }

    public List<Nota> obtenerPorAsignatura(Long id) {
        return notaRepository.findByAsignaturaId(id);
    }

}
