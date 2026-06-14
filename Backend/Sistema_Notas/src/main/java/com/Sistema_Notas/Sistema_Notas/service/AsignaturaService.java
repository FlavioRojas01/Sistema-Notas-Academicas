package com.Sistema_Notas.Sistema_Notas.service;

import com.Sistema_Notas.Sistema_Notas.entity.Asignatura;
import com.Sistema_Notas.Sistema_Notas.repository.AsignaturaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsignaturaService {

    private final AsignaturaRepository asignaturaRepository;

    public AsignaturaService(
            AsignaturaRepository asignaturaRepository) {

        this.asignaturaRepository = asignaturaRepository;
    }

    public List<Asignatura> listarTodas() {
        return asignaturaRepository.findAll();
    }

    public Asignatura buscarPorId(Long id) {
        return asignaturaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Asignatura no encontrada"));
    }

    public Asignatura guardar(Asignatura asignatura) {
        return asignaturaRepository.save(asignatura);
    }

    public Asignatura actualizar(
            Long id,
            Asignatura asignatura) {

        Asignatura existente = buscarPorId(id);

        existente.setNombre(asignatura.getNombre());
        existente.setDescripcion(asignatura.getDescripcion());

        return asignaturaRepository.save(existente);
    }

    public void eliminar(Long id) {
        asignaturaRepository.deleteById(id);
    }

}
