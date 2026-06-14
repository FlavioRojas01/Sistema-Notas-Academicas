import type { Alumno } from "../types/Alumno";
import { Pencil, Trash2, User } from "lucide-react";

interface Props {
  alumnos: Alumno[];
  onEditar: (alumno: Alumno) => void;
  onEliminar: (id: number) => void;
}

function AlumnoTable({
  alumnos,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <div className="space-y-4">

      {alumnos.map((alumno) => (

        <div
          key={alumno.id}
          className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
        >

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {alumno.nombre.charAt(0)}
              {alumno.apellido.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                {alumno.nombre} {alumno.apellido}
              </h3>

              <p className="text-sm text-gray-500">
                Código: {alumno.codigo}
              </p>

              <p className="text-sm text-gray-500">
                {alumno.email}
              </p>
            </div>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() => onEditar(alumno)}
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onEliminar(alumno.id!)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default AlumnoTable;