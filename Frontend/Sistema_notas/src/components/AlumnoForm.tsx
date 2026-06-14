import { useState, useEffect } from "react";
import type { Alumno } from "../types/Alumno";

interface Props {
  alumnoEditar: Alumno | null;
  onGuardar: (alumno: Alumno) => void;
}

function AlumnoForm({
  alumnoEditar,
  onGuardar,
}: Props) {

  const [formData, setFormData] = useState<Alumno>({
    nombre: "",
    apellido: "",
    email: "",
  });

  useEffect(() => {
    if (alumnoEditar) {
      setFormData({
        nombre: alumnoEditar.nombre,
        apellido: alumnoEditar.apellido,
        email: alumnoEditar.email,
        id: alumnoEditar.id,
        codigo: alumnoEditar.codigo,
      });
    }
  }, [alumnoEditar]);

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
      apellido: "",
      email: "",
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
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        {alumnoEditar
          ? "Actualizar Alumno"
          : "Guardar Alumno"}
      </button>
    </form>
  );
}

export default AlumnoForm;