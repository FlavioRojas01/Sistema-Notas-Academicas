package com.Sistema_Notas.Sistema_Notas.service;

import com.Sistema_Notas.Sistema_Notas.entity.Alumno;
import com.Sistema_Notas.Sistema_Notas.repository.AlumnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService {
    private final AlumnoRepository alumnoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    public List<Alumno> listarTodos() {
        return alumnoRepository.findAll();
    }

    public Alumno buscarPorId(Long id) {
        return alumnoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Alumno no encontrado"));
    }

    public Alumno guardar(Alumno alumno) {

        long siguienteNumero =
                alumnoRepository.count() + 1;

        String codigo =
                String.format(
                        "ALU-%03d",
                        siguienteNumero
                );

        alumno.setCodigo(codigo);

        return alumnoRepository.save(alumno);
    }

    public Alumno actualizar(Long id, Alumno alumno) {

        Alumno existente = buscarPorId(id);

        existente.setNombre(alumno.getNombre());
        existente.setApellido(alumno.getApellido());
        existente.setEmail(alumno.getEmail());

        return alumnoRepository.save(existente);
    }

    public void eliminar(Long id) {
        alumnoRepository.deleteById(id);
    }

    public List<Alumno> buscarPorNombre(String nombre) {
        return alumnoRepository
                .findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(
                        nombre,
                        nombre
                );
    }
}
