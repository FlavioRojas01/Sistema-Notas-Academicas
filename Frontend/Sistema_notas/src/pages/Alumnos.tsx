import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import api from "../services/api";

import type { Alumno } from "../types/Alumno";

import AlumnoForm from "../components/AlumnoForm";
import AlumnoTable from "../components/AlumnoTable";

function Alumnos() {

  const [alumnos, setAlumnos] =
    useState<Alumno[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [alumnoEditar,
    setAlumnoEditar] =
    useState<Alumno | null>(null);

  const cargarAlumnos =
    async () => {

      const response =
        await api.get("/alumnos");

      setAlumnos(response.data);
    };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const guardarAlumno =
    async (alumno: Alumno) => {

      try {

        if (alumno.id) {

          await api.put(
            `/alumnos/${alumno.id}`,
            alumno
          );

          Swal.fire(
            "Actualizado",
            "Alumno actualizado correctamente",
            "success"
          );

        } else {

          await api.post(
            "/alumnos",
            alumno
          );

          Swal.fire(
            "Guardado",
            "Alumno registrado correctamente",
            "success"
          );
        }

        setAlumnoEditar(null);

        cargarAlumnos();

      } catch {

        Swal.fire(
          "Error",
          "No se pudo guardar",
          "error"
        );
      }
    };

  const eliminarAlumno =
    async (id: number) => {

      const result =
        await Swal.fire({
          title:
            "¿Eliminar alumno?",
          icon: "warning",
          showCancelButton: true,
        });

      if (!result.isConfirmed)
        return;

      await api.delete(
        `/alumnos/${id}`
      );

      Swal.fire(
        "Eliminado",
        "Alumno eliminado",
        "success"
      );

      cargarAlumnos();
    };

  const alumnosFiltrados =
    alumnos.filter((a) =>
      `${a.nombre} ${a.apellido}`
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  return (
    <div>

      <h1 className="text-3xl font-bold mb-5">
        Gestión de Alumnos
      </h1>

      <input
        type="text"
        placeholder="Buscar alumno..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(
            e.target.value
          )
        }
        className="w-full p-3 border rounded-lg mb-5"
      />

      <AlumnoForm
        alumnoEditar={
          alumnoEditar
        }
        onGuardar={
          guardarAlumno
        }
      />

      <AlumnoTable
        alumnos={alumnosFiltrados}
        onEditar={setAlumnoEditar}
        onEliminar={eliminarAlumno}
      />

    </div>
  );
}

export default Alumnos;