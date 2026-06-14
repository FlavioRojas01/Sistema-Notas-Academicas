package com.Sistema_Notas.Sistema_Notas.controller;

import com.Sistema_Notas.Sistema_Notas.dto.NotaDTO;
import com.Sistema_Notas.Sistema_Notas.entity.Nota;
import com.Sistema_Notas.Sistema_Notas.service.NotaService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
@CrossOrigin("*")
public class NotaController {

    private final NotaService notaService;

    public NotaController(
            NotaService notaService) {

        this.notaService = notaService;
    }

    @GetMapping
    public List<Nota> listarTodas() {
        return notaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Nota buscarPorId(
            @PathVariable Long id) {

        return notaService.buscarPorId(id);
    }

    @PostMapping
    public Nota guardar(
            @Valid
            @RequestBody NotaDTO dto) {

        return notaService.guardar(dto);
    }

    @PutMapping("/{id}")
    public Nota actualizar(
            @PathVariable Long id,
            @Valid
            @RequestBody NotaDTO dto) {

        return notaService.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id) {

        notaService.eliminar(id);
    }

    @GetMapping("/alumno/{id}")
    public List<Nota> notasAlumno(
            @PathVariable Long id) {

        return notaService.obtenerPorAlumno(id);
    }

    @GetMapping("/asignatura/{id}")
    public List<Nota> notasAsignatura(
            @PathVariable Long id) {

        return notaService.obtenerPorAsignatura(id);
    }

}
