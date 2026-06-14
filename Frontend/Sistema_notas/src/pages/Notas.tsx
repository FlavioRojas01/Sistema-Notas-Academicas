import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import api from "../services/api";

import EstadisticasNotas from "../components/EstadisticasNotas";
import NotaForm from "../components/NotaForm";
import NotaTable from "../components/NotaTable";

import type { Nota } from "../types/Nota";
import type { NotaDTO } from "../types/NotaDTO";

function Notas() {

  const [notas, setNotas] =
    useState<Nota[]>([]);

  const [notaEditar, setNotaEditar] =
    useState<Nota | null>(null);

  const promedioGeneral =
    notas.length > 0
      ? notas.reduce(
          (sum, nota) => sum + nota.nota,
          0
        ) / notas.length
      : 0;

  const [datosGrafico,
    setDatosGrafico] = useState([]);

  const cargarNotas = async () => {

    const notasResponse =
      await api.get("/notas");

    setNotas(
      notasResponse.data
    );

    const promedioResponse =
      await api.get(
        "/reportes/promedios-por-alumno"
      );

    setDatosGrafico(
      promedioResponse.data
    );
  };

  useEffect(() => {

    cargarNotas();

  }, []);

  const guardarNota = async (
    nota: NotaDTO,
    id?: number
  ) => {

    try {

      if (id) {

        await api.put(
          `/notas/${id}`,
          nota
        );

        Swal.fire(
          "Actualizado",
          "Nota actualizada correctamente",
          "success"
        );
        setNotaEditar(null);
        cargarNotas();

      } else {

        await api.post(
          "/notas",
          nota
        );

        Swal.fire(
          "Guardado",
          "Nota registrada correctamente",
          "success"
        );

      }

      setNotaEditar(null);

      cargarNotas();

    } catch (error: any) {

      Swal.fire(
        "Error",
        error.response?.data ||
        "Error al guardar",
        "error"
      );

    }

  };

  const eliminarNota =
    async (
      id: number
    ) => {

      const result =
        await Swal.fire({
          title: "¿Eliminar nota?",
          icon: "warning",
          showCancelButton: true,
        });

      if (!result.isConfirmed)
        return;

      await api.delete(
        `/notas/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Nota eliminada",
      });

      cargarNotas();

    };

  const editarNota = (
    nota: Nota
  ) => {

    setNotaEditar(nota);

    Swal.fire({
      icon: "info",
      title: "Modo edición activado"
    });

  };

  return (

    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-5
      "
      >
        Gestión de Notas
      </h1>

      <NotaForm
        notaEditar={notaEditar}
        onGuardar={guardarNota}
        onCancelar={() => setNotaEditar(null)}
      />

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
      "
      >

        <div
          className="
          md:col-span-3
        "
        >

          <NotaTable
            notas={notas}
            onDelete={eliminarNota}
            onEdit={editarNota}
          />

        </div>

        <div>

          <EstadisticasNotas
            promedioGeneral={
              promedioGeneral
            }
            datos={
              datosGrafico
            }
          />

        </div>

      </div>

    </div>

  );

}

export default Notas;
