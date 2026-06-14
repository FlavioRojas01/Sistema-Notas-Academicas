INSERT INTO asignaturas(nombre, descripcion)
VALUES
    ('Matemáticas', 'Curso de matemáticas'),
    ('Programación', 'Curso de programación'),
    ('Base de Datos', 'Curso de base de datos'),
    ('Inglés', 'Curso de inglés'),
    ('Física', 'Curso de física');

INSERT INTO alumnos(nombre, apellido, codigo, email)
VALUES
    ('Juan', 'Perez', 'ALU-001', 'juan@gmail.com'),
    ('Maria', 'Lopez', 'ALU-002', 'maria@gmail.com'),
    ('Carlos', 'Gomez', 'ALU-003', 'carlos@gmail.com');


INSERT INTO notas(alumno_id, asignatura_id, nota, fecha, observacion)
VALUES
    (1,1,15.50,'2026-06-01','Buen desempeño'),
    (1,2,18.00,'2026-06-02','Excelente'),
    (2,1,10.00,'2026-06-01','Necesita mejorar'),
    (3,3,14.00,'2026-06-03','Buen trabajo');