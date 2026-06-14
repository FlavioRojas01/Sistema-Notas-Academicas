# Sistema de Gestión de Notas Académicas

## Descripción

Sistema web desarrollado para la gestión de notas académicas de estudiantes utilizando una arquitectura cliente-servidor.

El proyecto permite administrar alumnos, asignaturas y notas, además de generar reportes académicos y visualizar estadísticas mediante gráficos.

## Tecnologías Utilizadas

### Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* Maven

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Recharts
* SweetAlert2

## Funcionalidades

### Gestión de Alumnos

* Registrar alumnos.
* Listar alumnos.
* Editar alumnos.
* Eliminar alumnos.

### Gestión de Asignaturas

* Registrar asignaturas.
* Listar asignaturas.
* Editar asignaturas.
* Eliminar asignaturas.

### Gestión de Notas

* Registrar notas.
* Listar notas.
* Eliminar notas.
* Validación de notas entre 0 y 20.
* Validación de notas duplicadas por alumno, asignatura y fecha.

### Reportes Académicos

* Promedio general.
* Nota más alta.
* Alumnos en riesgo académico.
* Promedio por alumno.
* Promedio por asignatura.

### Estadísticas

* Gráfico de barras de promedios por alumno.
* Indicadores académicos en tiempo real.

## Estructura del Proyecto

```text
Sistema_Notas/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   └── resources/
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── types/
│   └── assets/
│
└── README.md
```

## Requisitos Previos

Instalar:

* Java JDK 21
* Node.js 20 o superior
* MySQL Server
* IntelliJ IDEA
* Visual Studio Code
* Git

## Configuración de Base de Datos

Crear una base de datos llamada:

```sql
CREATE DATABASE sistema_notas;
```

Configurar el archivo:

```properties
src/main/resources/application.properties
```

Ejemplo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_notas
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Datos de Prueba

El proyecto incluye un archivo:

```text
src/main/resources/data.sql
```

que carga automáticamente:

* Alumnos
* Asignaturas
* Notas

para realizar pruebas iniciales.

## Ejecución del Backend

Ingresar a la carpeta del backend.

Ejecutar:

```bash
mvn clean install
```

Luego iniciar el proyecto:

```bash
mvn spring-boot:run
```

El servidor estará disponible en:

```text
http://localhost:8080
```

## Ejecución del Frontend

Ingresar a la carpeta del frontend.

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## API Principal

### Alumnos

```http
GET /api/alumnos
POST /api/alumnos
PUT /api/alumnos/{id}
DELETE /api/alumnos/{id}
```

### Asignaturas

```http
GET /api/asignaturas
POST /api/asignaturas
PUT /api/asignaturas/{id}
DELETE /api/asignaturas/{id}
```

### Notas

```http
GET /api/notas
POST /api/notas
PUT /api/notas/{id}
DELETE /api/notas/{id}
```

### Reportes

```http
GET /api/reportes
GET /api/reportes/promedios
GET /api/reportes/promedios-asignatura
GET /api/reportes/alumnos-en-riesgo
```

## Validaciones Implementadas

* Nota mínima: 0.
* Nota máxima: 20.
* Campos obligatorios.
* Prevención de registros duplicados.
* Manejo de excepciones personalizadas.

## Autor

Proyecto desarrollado como trabajo académico para el curso de Desarrollo de Aplicaciones Web utilizando React y Spring Boot.
