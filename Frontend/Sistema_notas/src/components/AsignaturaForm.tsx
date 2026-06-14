import { useState, useEffect } from "react";
import type { Asignatura } from "../types/Asignatura";

interface Props {
  asignaturaEditar: Asignatura | null;
  onGuardar: (asignatura: Asignatura) => void;
}

function AsignaturaForm({
  asignaturaEditar,
  onGuardar,
}: Props) {

  const [formData, setFormData] =
    useState<Asignatura>({
      nombre: "",
      descripcion: "",
    });

  useEffect(() => {
    if (asignaturaEditar) {
      setFormData(asignaturaEditar);
    }
  }, [asignaturaEditar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    onGuardar(formData);

    setFormData({
      nombre: "",
      descripcion: "",
    });

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow mb-5"
    >

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la asignatura"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {asignaturaEditar
          ? "Actualizar Asignatura"
          : "Guardar Asignatura"}
      </button>

    </form>
  );
}

export default AsignaturaForm;