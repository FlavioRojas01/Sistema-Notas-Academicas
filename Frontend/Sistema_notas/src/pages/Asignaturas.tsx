import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import api from "../services/api";

import type { Asignatura } from "../types/Asignatura";

import AsignaturaForm from "../components/AsignaturaForm";
import AsignaturaTable from "../components/AsignaturaTable";

function Asignaturas() {

  const [asignaturas, setAsignaturas] =
    useState<Asignatura[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [asignaturaEditar,
    setAsignaturaEditar] =
    useState<Asignatura | null>(null);

  const cargarAsignaturas =
    async () => {

      const response =
        await api.get("/asignaturas");

      setAsignaturas(response.data);
    };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    cargarAsignaturas();
  }, []);

  const guardarAsignatura =
    async (
      asignatura: Asignatura
    ) => {

      try {

        if (asignatura.id) {

          await api.put(
            `/asignaturas/${asignatura.id}`,
            asignatura
          );

          Swal.fire({
            icon: "success",
            title: "Asignatura actualizada"
          });

        } else {

          await api.post(
            "/asignaturas",
            asignatura
          );

          Swal.fire({
            icon: "success",
            title: "Asignatura registrada"
          });

        }

        setAsignaturaEditar(null);

        cargarAsignaturas();

      } catch {

        Swal.fire({
          icon: "error",
          title: "Error al guardar"
        });
      }
    };

  const eliminarAsignatura =
    async (
      id: number
    ) => {

      const result =
        await Swal.fire({
          title: "¿Eliminar asignatura?",
          icon: "warning",
          showCancelButton: true,
        });

      if (!result.isConfirmed)
        return;

      await api.delete(
        `/asignaturas/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Asignatura eliminada"
      });

      cargarAsignaturas();
    };

  const asignaturasFiltradas =
    asignaturas.filter(
      (a) =>
        a.nombre
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  return (

    <div>

      <h1 className="text-3xl font-bold mb-5">
        Gestión de Asignaturas
      </h1>

      <input
        type="text"
        placeholder="Buscar asignatura..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(
            e.target.value
          )
        }
        className="w-full p-3 border rounded-lg mb-5"
      />

      <AsignaturaForm
        asignaturaEditar={
          asignaturaEditar
        }
        onGuardar={
          guardarAsignatura
        }
      />

      <AsignaturaTable
        asignaturas={
          asignaturasFiltradas
        }
        onDelete={
          eliminarAsignatura
        }
        onEdit={
          setAsignaturaEditar
        }
      />

    </div>

  );
}

export default Asignaturas;