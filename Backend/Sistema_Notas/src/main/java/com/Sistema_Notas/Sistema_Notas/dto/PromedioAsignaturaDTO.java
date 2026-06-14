package com.Sistema_Notas.Sistema_Notas.dto;

public class PromedioAsignaturaDTO {

    private String nombreAsignatura;
    private Double promedio;

    public PromedioAsignaturaDTO(
            String nombreAsignatura,
            Double promedio) {

        this.nombreAsignatura =
                nombreAsignatura;

        this.promedio =
                promedio;
    }

    public String getNombreAsignatura() {
        return nombreAsignatura;
    }

    public Double getPromedio() {
        return promedio;
    }

}
