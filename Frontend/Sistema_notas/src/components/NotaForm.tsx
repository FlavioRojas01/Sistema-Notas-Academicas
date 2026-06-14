import { useEffect, useState } from "react";
import api from "../services/api";

import type { Alumno } from "../types/Alumno";
import type { Asignatura } from "../types/Asignatura";
import type { NotaDTO } from "../types/NotaDTO";
import type { Nota } from "../types/Nota";

interface Props {
  notaEditar: Nota | null;

  onGuardar: (
    nota: NotaDTO,
    id?: number
  ) => void;

  onCancelar: () => void;
}

function NotaForm({
  notaEditar,
  onGuardar,
  onCancelar,
}: Props) {

  const [alumnos, setAlumnos] =
    useState<Alumno[]>([]);

  const [asignaturas, setAsignaturas] =
    useState<Asignatura[]>([]);

  const [formData, setFormData] =
    useState<NotaDTO>({
      alumnoId: 0,
      asignaturaId: 0,
      nota: 0,
      fecha: "",
      observacion: "",
    });

  const limpiarFormulario = () => {

    setFormData({
      alumnoId: 0,
      asignaturaId: 0,
      nota: 0,
      fecha: "",
      observacion: "",
    });

  };

  const cargarDatos = async () => {

    try {

      const alumnosResponse =
        await api.get("/alumnos");

      const asignaturasResponse =
        await api.get("/asignaturas");

      setAlumnos(alumnosResponse.data);
      setAsignaturas(asignaturasResponse.data);

    } catch (error) {

      console.error(
        "Error cargando datos",
        error
      );

    }

  };

  useEffect(() => {

    cargarDatos();

  }, []);

  useEffect(() => {

    if (notaEditar) {

      setFormData({
        alumnoId:
          notaEditar.alumno.id!,
        asignaturaId:
          notaEditar.asignatura.id!,
        nota:
          notaEditar.nota,
        fecha:
          notaEditar.fecha,
        observacion:
          notaEditar.observacion || "",
      });

    } else {

      limpiarFormulario();

    }

  }, [notaEditar]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    onGuardar(
      {
        ...formData,
        alumnoId:
          Number(formData.alumnoId),

        asignaturaId:
          Number(formData.asignaturaId),

        nota:
          Number(formData.nota),
      },
      notaEditar?.id
    );

    if (!notaEditar) {
      limpiarFormulario();
    }

  };

  const cancelarEdicion = () => {

    limpiarFormulario();

    onCancelar();

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        p-5
        rounded-xl
        shadow
        mb-5
      "
    >

      <div
        className="
          grid
          md:grid-cols-2
          gap-4
        "
      >

        <select
          name="alumnoId"
          value={formData.alumnoId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">
            Seleccione alumno
          </option>

          {alumnos.map((a) => (

            <option
              key={a.id}
              value={a.id}
            >
              {a.nombre} {a.apellido}
            </option>

          ))}

        </select>

        <select
          name="asignaturaId"
          value={formData.asignaturaId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">
            Seleccione asignatura
          </option>

          {asignaturas.map((a) => (

            <option
              key={a.id}
              value={a.id}
            >
              {a.nombre}
            </option>

          ))}

        </select>

        <input
          type="number"
          name="nota"
          min="0"
          max="20"
          step="0.1"
          placeholder="Calificación"
          value={formData.nota}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

      </div>

      <textarea
        name="observacion"
        placeholder="Observación"
        value={formData.observacion}
        onChange={handleChange}
        className="
          border
          p-2
          rounded
          w-full
          mt-4
        "
      />

      <div className="flex gap-2 mt-4">

        <button
          type="submit"
          className={`
            text-white
            px-4
            py-2
            rounded
            transition
            ${
              notaEditar
                ? "bg-green-600 hover:bg-green-700"
                : "bg-orange-600 hover:bg-orange-700"
            }
          `}
        >
          {notaEditar
            ? "Actualizar Nota"
            : "Guardar Nota"}
        </button>

        {notaEditar && (

          <button
            type="button"
            onClick={cancelarEdicion}
            className="
              bg-gray-500
              hover:bg-gray-600
              text-white
              px-4
              py-2
              rounded
            "
          >
            Cancelar
          </button>

        )}

      </div>

    </form>

  );

}

export default NotaForm;