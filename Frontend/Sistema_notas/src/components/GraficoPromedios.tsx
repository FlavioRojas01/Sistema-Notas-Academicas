import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import type {
  PromedioAlumno
} from "../types/PromedioAlumno";

interface Props {
  datos: PromedioAlumno[];
}

function GraficoPromedios({
  datos,
}: Props) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-5
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-5
        "
      >
        Promedio por Alumno
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart
          data={datos}
          layout="vertical"
        >

          <XAxis
            type="number"
            domain={[0, 20]}
          />

          <YAxis
            type="category"
            dataKey="nombreAlumno"
            width={120}
          />

          <Tooltip />

          <Bar dataKey="promedio">

            {datos.map(
              (item, index) => (

                <Cell
                  key={index}
                  fill={
                    item.promedio < 11
                      ? "#ef4444"
                      : item.promedio < 14
                      ? "#f59e0b"
                      : "#22c55e"
                  }
                />

              )
            )}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default GraficoPromedios;