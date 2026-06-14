import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Alumnos from "./pages/Alumnos";
import Asignaturas from "./pages/Asignaturas";
import Notas from "./pages/Notas";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-6">

        <Navbar />

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/alumnos" element={<Alumnos />} />

          <Route path="/asignaturas" element={<Asignaturas />} />

          <Route path="/notas" element={<Notas />} />

          <Route path="/reportes" element={<Reportes />} />

        </Routes>

      </main>

    </div>
  );
}

export default App;