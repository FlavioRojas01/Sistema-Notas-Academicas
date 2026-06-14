import { Trash2, Pencil } from "lucide-react";

import type { Nota } from "../types/Nota";

interface Props {
  notas: Nota[];
  onDelete: (id: number) => void;
  onEdit: (nota: Nota) => void;
}

function NotaTable({ notas, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Alumno</th>

              <th className="p-3 text-left">Asignatura</th>

              <th className="p-3 text-center">Nota</th>

              <th className="p-3 text-center">Estado</th>

              <th className="p-3 text-center">Fecha</th>

              <th className="p-3 text-left">Observación</th>

              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {notas.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="
                  text-center
                  p-6
                  text-gray-500
                "
                >
                  No hay notas registradas
                </td>
              </tr>
            ) : (
              notas.map((nota) => (
                <tr
                  key={nota.id}
                  className="
                  border-b
                  hover:bg-gray-50
                  transition
                "
                >
                  <td className="p-3">
                    <div>
                      <p className="font-medium">
                        {nota.alumno.nombre} {nota.alumno.apellido}
                      </p>

                      <p className="text-xs text-gray-500">
                        {nota.alumno.codigo}
                      </p>
                    </div>
                  </td>

                  <td className="p-3">{nota.asignatura.nombre}</td>

                  <td className="p-3 text-center">
                    <span
                      className={
                        nota.nota >= 14
                          ? `
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        font-semibold
      `
                          : nota.nota >= 11
                            ? `
        bg-yellow-100
        text-yellow-700
        px-3
        py-1
        rounded-full
        font-semibold
      `
                            : `
        bg-red-100
        text-red-700
        px-3
        py-1
        rounded-full
        font-semibold
      `
                      }
                    >
                      {nota.nota}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {nota.nota >= 14 ? (
                      <span
                        className="
    bg-green-500
    text-white
    px-3
    py-1
    rounded-full
    text-sm
    font-medium
  "
                      >
                        Aprobado
                      </span>
                    ) : nota.nota >= 11 ? (
                      <span
                        className="
    bg-yellow-500
    text-white
    px-3
    py-1
    rounded-full
    text-sm
    font-medium
  "
                      >
                        Regular
                      </span>
                    ) : (
                      <span
                        className="
    bg-red-500
    text-white
    px-3
    py-1
    rounded-full
    text-sm
    font-medium
  "
                      >
                        Desaprobado
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center">{nota.fecha}</td>

                  <td className="p-3">{nota.observacion || "-"}</td>

                  <td className="p-3">
                    <div
                      className="
                      flex
                      gap-2
                      justify-center
                    "
                    >
                      <button
                        onClick={() => onEdit(nota)}
                        className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        p-2
                        rounded-lg
                        transition
                      "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(nota.id!)}
                        className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        p-2
                        rounded-lg
                        transition
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotaTable;
