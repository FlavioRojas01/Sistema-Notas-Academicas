package com.Sistema_Notas.Sistema_Notas.dto;

public class PromedioAlumnoDTO {

    private String nombreAlumno;
    private Double promedio;

    public PromedioAlumnoDTO(
            String nombreAlumno,
            Double promedio) {

        this.nombreAlumno = nombreAlumno;
        this.promedio = promedio;
    }

    public String getNombreAlumno() {
        return nombreAlumno;
    }

    public Double getPromedio() {
        return promedio;
    }

}
