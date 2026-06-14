import type { Alumno } from "./Alumno";

export interface ReporteGeneral {
  promedioGeneral: number;
  notaMasAlta: number;
  alumnosEnRiesgo: Alumno[];
}