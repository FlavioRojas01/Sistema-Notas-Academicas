import { useEffect, useState } from "react";

import {
  Award,
  AlertTriangle,
  BarChart3,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import type { PromedioAsignatura } from "../types/PromedioAsignatura";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import api from "../services/api";

import type { ReporteGeneral } from "../types/ReporteGeneral";
import type { PromedioAlumno } from "../types/PromedioAlumno";

function Reportes() {

  const [reporte, setReporte] =
    useState<ReporteGeneral | null>(null);

  const [promedios, setPromedios] =
    useState<PromedioAlumno[]>([]);

  const [promediosAsignatura,
    setPromediosAsignatura] =
    useState<PromedioAsignatura[]>([]);

  const cargarDatos = async () => {
    try {

      console.log("Consultando reporte...");
      const reporteResponse =
        await api.get("/reportes");

      console.log(
        "Reporte:",
        reporteResponse.data
      );

      console.log("Consultando promedios...");
      const promediosResponse =
        await api.get("/reportes/promedios-por-alumno");

      console.log(
        "Promedios:",
        promediosResponse.data
      );

      console.log(
        "Consultando asignaturas..."
      );

      const asignaturasResponse =
        await api.get(
          "/reportes/promedios-asignatura"
        );

      console.log(
        "Asignaturas:",
        asignaturasResponse.data
      );

      setReporte(
        reporteResponse.data
      );

      setPromedios(
        promediosResponse.data
      );

      setPromediosAsignatura(
        asignaturasResponse.data
      );

    } catch (error) {

      console.error(
        "ERROR REPORTES:",
        error
      );

    }
  };

  useEffect(() => {

    cargarDatos();

  }, []);

  const exportarPDF = () => {

    if (!reporte) return;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Reporte Académico",
      14,
      15
    );

    autoTable(doc, {
      startY: 25,
      head: [
        [
          "Código",
          "Alumno",
          "Correo"
        ]
      ],
      body:
        reporte.alumnosEnRiesgo.map(
          (a) => [
            a.codigo,
            `${a.nombre} ${a.apellido}`,
            a.email
          ]
        )
    });

    doc.save(
      "ReporteAcademico.pdf"
    );

  };

  const exportarExcel = () => {

    if (!reporte) return;

    const datos =
      reporte.alumnosEnRiesgo.map(
        (a) => ({
          Codigo: a.codigo,
          Alumno:
            `${a.nombre} ${a.apellido}`,
          Correo: a.email,
        })
      );

    const hoja =
      XLSX.utils.json_to_sheet(
        datos
      );

    const libro =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      libro,
      hoja,
      "Alumnos Riesgo"
    );

    XLSX.writeFile(
      libro,
      "ReporteAcademico.xlsx"
    );

  };

  if (!reporte) {

    return (
      <div className="p-5">
        Cargando reportes...
      </div>
    );

  }

  return (

    <div className="space-y-6">

      <div
        className="
        flex
        justify-between
        items-center
      "
      >

        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Dashboard de Reportes
        </h1>

        <div className="flex gap-3">

          <button
            onClick={exportarPDF}
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-lg
            flex
            items-center
            gap-2
          "
          >
            <FileText size={18} />
            PDF
          </button>

          <button
            onClick={exportarExcel}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-4
            py-2
            rounded-lg
            flex
            items-center
            gap-2
          "
          >
            <FileSpreadsheet size={18} />
            Excel
          </button>

        </div>

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-5
      "
      >

        <div
          className="
          bg-blue-500
          text-white
          rounded-xl
          p-5
          shadow
        "
        >

          <div
            className="
            flex
            justify-between
            items-center
          "
          >

            <div>

              <p>
                Promedio General
              </p>

              <h2
                className="
                text-4xl
                font-bold
              "
              >
                {reporte.promedioGeneral.toFixed(2)}
              </h2>

            </div>

            <BarChart3 size={40} />

          </div>

        </div>

        <div
          className="
          bg-green-500
          text-white
          rounded-xl
          p-5
          shadow
        "
        >

          <div
            className="
            flex
            justify-between
            items-center
          "
          >

            <div>

              <p>
                Nota Más Alta
              </p>

              <h2
                className="
                text-4xl
                font-bold
              "
              >
                {reporte.notaMasAlta}
              </h2>

            </div>

            <Award size={40} />

          </div>

        </div>

        <div
          className="
          bg-red-500
          text-white
          rounded-xl
          p-5
          shadow
        "
        >

          <div
            className="
            flex
            justify-between
            items-center
          "
          >

            <div>

              <p>
                Alumnos en Riesgo
              </p>

              <h2
                className="
                text-4xl
                font-bold
              "
              >
                {
                  reporte
                    .alumnosEnRiesgo
                    .length
                }
              </h2>

            </div>

            <AlertTriangle size={40} />

          </div>

        </div>

      </div>

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
    mb-4
  "
        >
          Promedio por Alumno
        </h2>

        <ResponsiveContainer
          width="100%"
          height={
            promedios.length * 70
          }
        >

          <BarChart
            data={promedios}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 50,
              bottom: 10,
            }}
          >

            <XAxis
              type="number"
              domain={[0, 20]}
            />

            <YAxis
              type="category"
              dataKey="nombreAlumno"
              width={140}
            />

            <Tooltip />

            <Bar
              dataKey="promedio"
              radius={[0, 10, 10, 0]}
            >

              {promedios.map(
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
        <div className="flex gap-6 mt-4 text-sm">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Aprobado (14 - 20)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Regular (11 - 13)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Desaprobado (0 - 10)</span>
          </div>

        </div>

      </div>

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
    mb-4
  "
        >
          Promedio por Asignatura
        </h2>

        <ResponsiveContainer
          width="100%"
          height={
            promediosAsignatura.length * 70
          }
        >

          <BarChart
            data={promediosAsignatura}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 50,
              bottom: 10,
            }}
          >

            <XAxis
              type="number"
              domain={[0, 20]}
            />

            <YAxis
              type="category"
              dataKey="nombreAsignatura"
              width={150}
            />

            <Tooltip />

            <Bar
              dataKey="promedio"
              radius={[0, 10, 10, 0]}
            >

              {promediosAsignatura.map(
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

        <div
          className="
    flex
    gap-6
    mt-4
    text-sm
  "
        >

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Aprobado (14 - 20)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Regular (11 - 13)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Desaprobado (0 - 10)</span>
          </div>
        </div>

      </div>

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
          mb-4
        "
        >
          Alumnos en Riesgo
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-red-100">

              <th className="p-3">
                Código
              </th>

              <th className="p-3">
                Nombre
              </th>

              <th className="p-3">
                Correo
              </th>

            </tr>

          </thead>

          <tbody>

            {
              reporte.alumnosEnRiesgo.map(
                (alumno) => (

                  <tr
                    key={alumno.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {alumno.codigo}
                    </td>

                    <td className="p-3">
                      {alumno.nombre}
                      {" "}
                      {alumno.apellido}
                    </td>

                    <td className="p-3">
                      {alumno.email}
                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Reportes;