package com.Sistema_Notas.Sistema_Notas.controller;

import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import com.Sistema_Notas.Sistema_Notas.service.AlumnoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin("*")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping
    public List<Alumno> listarTodos() {
        return alumnoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Alumno buscarPorId(@PathVariable Long id) {
        return alumnoService.buscarPorId(id);
    }

    @PostMapping
    public Alumno guardar(@RequestBody Alumno alumno) {
        return alumnoService.guardar(alumno);
    }

    @PutMapping("/{id}")
    public Alumno actualizar(
            @PathVariable Long id,
            @RequestBody Alumno alumno) {

        return alumnoService.actualizar(id, alumno);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        alumnoService.eliminar(id);
    }

    @GetMapping("/buscar")
    public List<Alumno> buscar(
            @RequestParam String nombre) {

        return alumnoService.buscarPorNombre(nombre);
    }

}
