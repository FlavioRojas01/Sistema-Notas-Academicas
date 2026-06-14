import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  ClipboardList,
  BarChart3
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Sistema Notas
      </h1>

      <nav className="space-y-5">

        <Link
          to="/"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <LayoutDashboard size={20} />
          Panel
        </Link>

        <Link
          to="/alumnos"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <GraduationCap size={20} />
          Alumnos
        </Link>

        <Link
          to="/asignaturas"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <BookOpen size={20} />
          Asignaturas
        </Link>

        <Link
          to="/notas"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <ClipboardList size={20} />
          Notas
        </Link>

        <Link
          to="/reportes"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <BarChart3 size={20} />
          Reportes
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;