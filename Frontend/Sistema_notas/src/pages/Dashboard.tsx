function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Panel
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">
            Alumnos
          </h2>
          <p className="text-gray-500">
            Gestión de estudiantes
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">
            Asignaturas
          </h2>
          <p className="text-gray-500">
            Gestión de cursos
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">
            Notas
          </h2>
          <p className="text-gray-500">
            Registro académico
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">
            Reportes
          </h2>
          <p className="text-gray-500">
            Estadísticas académicas
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;