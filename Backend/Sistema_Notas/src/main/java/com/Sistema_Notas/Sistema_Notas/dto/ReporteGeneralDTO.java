package com.Sistema_Notas.Sistema_Notas.dto;

import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import java.util.List;

public class ReporteGeneralDTO {

    private Double promedioGeneral;
    private Double notaMasAlta;
    private List<Alumno> alumnosEnRiesgo;

    public ReporteGeneralDTO(
            Double promedioGeneral,
            Double notaMasAlta,
            List<Alumno> alumnosEnRiesgo) {

        this.promedioGeneral = promedioGeneral;
        this.notaMasAlta = notaMasAlta;
        this.alumnosEnRiesgo = alumnosEnRiesgo;
    }

    public Double getPromedioGeneral() {
        return promedioGeneral;
    }

    public Double getNotaMasAlta() {
        return notaMasAlta;
    }

    public List<Alumno> getAlumnosEnRiesgo() {
        return alumnosEnRiesgo;
    }

}
