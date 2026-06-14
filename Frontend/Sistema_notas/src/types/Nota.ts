import type { Alumno } from "./Alumno";
import type { Asignatura } from "./Asignatura";

export interface Nota {
  id?: number;
  alumno: Alumno;
  asignatura: Asignatura;
  nota: number;
  fecha: string;
  observacion: string;
}