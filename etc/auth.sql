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

CREATE TABLE IF NOT EXISTS "localidad"
(
    "id" BIGSERIAL PRIMARY KEY,
    "codigo" TEXT UNIQUE,
    "nombre" TEXT,
    "poblacion" BIGINT,
    "altitud" INTEGER,
    "temperatura" INTEGER,
    "superficie" DECIMAL,
    "fundacion" INTEGER
);

CREATE TABLE IF NOT EXISTS "producto"
(
    "id" BIGSERIAL PRIMARY KEY,
    "codigo" TEXT UNIQUE,
    "nombre" TEXT,
    "precio" DECIMAL,
    "embalaje" TEXT
);

CREATE TABLE IF NOT EXISTS "producto_localidad"
(
    "localidad_id" BIGINT REFERENCES "localidad" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "producto_id" BIGINT REFERENCES "producto" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "promedio_consumo" DECIMAL
);

CREATE TABLE IF NOT EXISTS "proveedor"
(
    "id" BIGSERIAL PRIMARY KEY,
    "codigo" TEXT UNIQUE,
    "nombre" TEXT,
    "origen" TEXT
);

CREATE TABLE IF NOT EXISTS "proveedor_producto"
(
    "proveedor_id" BIGINT REFERENCES "proveedor" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "producto_id" BIGINT REFERENCES "producto" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "origen" TEXT,
    "cantidad" INTEGER
)