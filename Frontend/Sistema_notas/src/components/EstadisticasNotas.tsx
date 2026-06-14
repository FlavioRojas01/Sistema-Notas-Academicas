import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  promedioGeneral: number;
  datos: {
    nombreAlumno: string;
    promedio: number;
  }[];
}

function EstadisticasNotas({
  promedioGeneral,
  datos,
}: Props) {

  return (

    <div className="space-y-4">

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-4
      "
      >

        <h2 className="font-bold text-lg">
          Promedio General
        </h2>

        <p
          className="
          text-4xl
          font-bold
          text-orange-600
        "
        >
          {promedioGeneral}
        </p>

      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        p-4
      "
      >

        <h2 className="font-bold mb-4">
          Rendimiento por Alumno
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={datos}>

            <XAxis dataKey="nombreAlumno" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="promedio">

              {datos.map(
                (item, index) => (

                  <Cell
                    key={index}
                    fill={
                      item.promedio >= 14
                        ? "#22c55e"
                        : item.promedio >= 11
                          ? "#f59e0b"
                          : "#ef4444"
                    }
                  />

                )
              )}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default EstadisticasNotas;