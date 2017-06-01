CREATE TABLE IF NOT EXISTS "usuario"
(
    "id" BIGSERIAL PRIMARY KEY,
    "correo" TEXT UNIQUE,
    "contraseña" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,
    "codigo" TEXT,
    "rol"   INTEGER
);