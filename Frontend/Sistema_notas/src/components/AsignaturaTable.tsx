import type { Asignatura } from "../types/Asignatura";

import {
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  asignaturas: Asignatura[];
  onDelete: (id: number) => void;
  onEdit: (
    asignatura: Asignatura
  ) => void;
}

function AsignaturaTable({
  asignaturas,
  onDelete,
  onEdit,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-green-700 text-white">

          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Acciones</th>
          </tr>

        </thead>

        <tbody>

          {asignaturas.map(
            (asignatura) => (

            <tr
              key={asignatura.id}
              className="border-b"
            >

              <td className="p-3">
                {asignatura.id}
              </td>

              <td className="p-3">
                {asignatura.nombre}
              </td>

              <td className="p-3">
                {asignatura.descripcion}
              </td>

              <td className="p-3">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      onEdit(asignatura)
                    }
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    <Pencil size={18}/>
                  </button>

                  <button
                    onClick={() =>
                      onDelete(
                        asignatura.id!
                      )
                    }
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <Trash2 size={18}/>
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default AsignaturaTable;