package com.Sistema_Notas.Sistema_Notas.controller;

import com.Sistema_Notas.Sistema_Notas.dto.PromedioAlumnoDTO;
import com.Sistema_Notas.Sistema_Notas.dto.PromedioAsignaturaDTO;
import com.Sistema_Notas.Sistema_Notas.dto.ReporteGeneralDTO;
import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import com.Sistema_Notas.Sistema_Notas.service.ReporteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin("*")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(
            ReporteService reporteService) {

        this.reporteService = reporteService;
    }

    @GetMapping
    public ReporteGeneralDTO obtenerReporteGeneral() {

        return new ReporteGeneralDTO(
                reporteService.promedioGeneral(),
                reporteService.notaMasAlta(),
                reporteService.alumnosEnRiesgo()
        );
    }

    @GetMapping("/promedio-general")
    public Double promedioGeneral() {
        return reporteService.promedioGeneral();
    }

    @GetMapping("/promedio-alumno/{id}")
    public Double promedioAlumno(
            @PathVariable Long id) {

        return reporteService.promedioAlumno(id);
    }

    @GetMapping("/nota-mas-alta")
    public Double notaMasAlta() {
        return reporteService.notaMasAlta();
    }

    @GetMapping("/alumnos-en-riesgo")
    public List<Alumno> alumnosEnRiesgo() {
        return reporteService.alumnosEnRiesgo();
    }

    @GetMapping("/promedios-por-alumno")
    public List<PromedioAlumnoDTO>
    promediosPorAlumno() {

        return reporteService
                .obtenerPromediosPorAlumno();
    }

    @GetMapping("/promedios-asignatura")
    public List<PromedioAsignaturaDTO>
    promediosPorAsignatura() {

        return reporteService
                .obtenerPromediosPorAsignatura();

    }

}
