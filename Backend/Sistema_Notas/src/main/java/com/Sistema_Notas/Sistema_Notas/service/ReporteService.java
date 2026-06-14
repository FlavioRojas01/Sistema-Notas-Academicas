package com.Sistema_Notas.Sistema_Notas.service;

import com.Sistema_Notas.Sistema_Notas.dto.PromedioAlumnoDTO;
import com.Sistema_Notas.Sistema_Notas.dto.PromedioAsignaturaDTO;
import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import com.Sistema_Notas.Sistema_Notas.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteService {

    private final NotaRepository notaRepository;

    public List<PromedioAlumnoDTO>
    obtenerPromediosPorAlumno() {

        return notaRepository
                .obtenerPromediosPorAlumno();
    }

    public ReporteService(
            NotaRepository notaRepository) {

        this.notaRepository = notaRepository;
    }

    public List<PromedioAsignaturaDTO>
    obtenerPromediosPorAsignatura() {

        return notaRepository
                .obtenerPromediosPorAsignatura();

    }

    public Double promedioGeneral() {
        return notaRepository.promedioGeneral();
    }

    public Double promedioAlumno(Long id) {
        return notaRepository.obtenerPromedioAlumno(id);
    }

    public Double notaMasAlta() {
        return notaRepository.notaMasAlta();
    }

    public List<Alumno> alumnosEnRiesgo() {
        return notaRepository.alumnosEnRiesgo();
    }

}
