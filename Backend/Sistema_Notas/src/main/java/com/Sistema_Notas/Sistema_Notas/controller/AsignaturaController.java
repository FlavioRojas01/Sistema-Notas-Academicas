package com.Sistema_Notas.Sistema_Notas.controller;

import com.Sistema_Notas.Sistema_Notas.entity.Asignatura;
import com.Sistema_Notas.Sistema_Notas.service.AsignaturaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignaturas")
@CrossOrigin("*")
public class AsignaturaController {

    private final AsignaturaService asignaturaService;

    public AsignaturaController(
            AsignaturaService asignaturaService) {

        this.asignaturaService = asignaturaService;
    }

    @GetMapping
    public List<Asignatura> listarTodas() {
        return asignaturaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Asignatura buscarPorId(
            @PathVariable Long id) {

        return asignaturaService.buscarPorId(id);
    }

    @PostMapping
    public Asignatura guardar(
            @RequestBody Asignatura asignatura) {

        return asignaturaService.guardar(asignatura);
    }

    @PutMapping("/{id}")
    public Asignatura actualizar(
            @PathVariable Long id,
            @RequestBody Asignatura asignatura) {

        return asignaturaService.actualizar(id, asignatura);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id) {

        asignaturaService.eliminar(id);
    }

}
