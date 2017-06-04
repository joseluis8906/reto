--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: localidad; Type: TABLE; Schema: public; Owner: reto
--

CREATE TABLE localidad (
    id bigint NOT NULL,
    codigo text,
    nombre text,
    poblacion bigint,
    altitud integer,
    temperatura integer,
    superficie numeric,
    fundacion integer
);


ALTER TABLE localidad OWNER TO reto;

--
-- Name: localidad_id_seq; Type: SEQUENCE; Schema: public; Owner: reto
--

CREATE SEQUENCE localidad_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE localidad_id_seq OWNER TO reto;

--
-- Name: localidad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reto
--

ALTER SEQUENCE localidad_id_seq OWNED BY localidad.id;


--
-- Name: producto; Type: TABLE; Schema: public; Owner: reto
--

CREATE TABLE producto (
    id bigint NOT NULL,
    codigo text,
    nombre text
);


ALTER TABLE producto OWNER TO reto;

--
-- Name: producto_id_seq; Type: SEQUENCE; Schema: public; Owner: reto
--

CREATE SEQUENCE producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE producto_id_seq OWNER TO reto;

--
-- Name: producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reto
--

ALTER SEQUENCE producto_id_seq OWNED BY producto.id;


--
-- Name: producto_localidad; Type: TABLE; Schema: public; Owner: reto
--

CREATE TABLE producto_localidad (
    id bigint NOT NULL,
    localidad_id bigint,
    producto_id bigint,
    promedio_consumo numeric
);


ALTER TABLE producto_localidad OWNER TO reto;

--
-- Name: producto_localidad_id_seq; Type: SEQUENCE; Schema: public; Owner: reto
--

CREATE SEQUENCE producto_localidad_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE producto_localidad_id_seq OWNER TO reto;

--
-- Name: producto_localidad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reto
--

ALTER SEQUENCE producto_localidad_id_seq OWNED BY producto_localidad.id;


--
-- Name: proveedor; Type: TABLE; Schema: public; Owner: reto
--

CREATE TABLE proveedor (
    id bigint NOT NULL,
    codigo text,
    nombre text,
    origen text
);


ALTER TABLE proveedor OWNER TO reto;

--
-- Name: proveedor_id_seq; Type: SEQUENCE; Schema: public; Owner: reto
--

CREATE SEQUENCE proveedor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE proveedor_id_seq OWNER TO reto;

--
-- Name: proveedor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reto
--

ALTER SEQUENCE proveedor_id_seq OWNED BY proveedor.id;


--
-- Name: proveedor_producto; Type: TABLE; Schema: public; Owner: reto
--

CREATE TABLE proveedor_producto (
    id bigint NOT NULL,
    proveedor_id bigint,
    producto_id bigint,
    origen text,
    cantidad integer,
    precio numeric,
    embalaje integer
);


ALTER TABLE proveedor_producto OWNER TO reto;

--
-- Name: proveedor_producto_id_seq; Type: SEQUENCE; Schema: public; Owner: reto
--

CREATE SEQUENCE proveedor_producto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE proveedor_producto_id_seq OWNER TO reto;

--
-- Name: proveedor_producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reto
--

ALTER SEQUENCE proveedor_producto_id_seq OWNED BY proveedor_producto.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: reto
--

CREATE TABLE usuario (
    id bigint NOT NULL,
    correo text,
    "contraseña" text,
    nombre text,
    apellido text,
    codigo text,
    rol integer
);


ALTER TABLE usuario OWNER TO reto;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: reto
--

CREATE SEQUENCE usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_seq OWNER TO reto;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: reto
--

ALTER SEQUENCE usuario_id_seq OWNED BY usuario.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reto
--

ALTER TABLE ONLY localidad ALTER COLUMN id SET DEFAULT nextval('localidad_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto ALTER COLUMN id SET DEFAULT nextval('producto_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto_localidad ALTER COLUMN id SET DEFAULT nextval('producto_localidad_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor ALTER COLUMN id SET DEFAULT nextval('proveedor_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor_producto ALTER COLUMN id SET DEFAULT nextval('proveedor_producto_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: reto
--

ALTER TABLE ONLY usuario ALTER COLUMN id SET DEFAULT nextval('usuario_id_seq'::regclass);


--
-- Data for Name: localidad; Type: TABLE DATA; Schema: public; Owner: reto
--

COPY localidad (id, codigo, nombre, poblacion, altitud, temperatura, superficie, fundacion) FROM stdin;
11	002	Agustín Codazzi	50450	131	28	1733.51	1959
1	001	Aguachica	93917	162	28	976.26	1749
19	025	Valledupar	463218	169	28	4493	1550
20	003	Astrea	19225	311	35	563.14	1936
21	004	Becerril	13388	137	29	1144	1594
22	005	Bosconia	37870	117	37	609	1979
23	006	Chimichagua	30585	42	35	1569	1748
24	007	Chiriguana	19375	50	28	1131.59	1530
25	008	Curumani	24035	112	20	931	1579
26	009	El Copey	26587	180	32	968.1	1936
27	010	El Paso	23013	50	30	823	1542
28	011	Gamarra	16856	180	32	320	1878
\.


--
-- Name: localidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reto
--

SELECT pg_catalog.setval('localidad_id_seq', 28, true);


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: reto
--

COPY producto (id, codigo, nombre) FROM stdin;
2	002	Aguacate
1	001	Lulo
3	003	Fresa
12	004	Pera
\.


--
-- Name: producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reto
--

SELECT pg_catalog.setval('producto_id_seq', 12, true);


--
-- Data for Name: producto_localidad; Type: TABLE DATA; Schema: public; Owner: reto
--

COPY producto_localidad (id, localidad_id, producto_id, promedio_consumo) FROM stdin;
3	1	3	257
1	1	1	159
\.


--
-- Name: producto_localidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reto
--

SELECT pg_catalog.setval('producto_localidad_id_seq', 8, true);


--
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: reto
--

COPY proveedor (id, codigo, nombre, origen) FROM stdin;
1	006	Julio Cesar	aguachica
\.


--
-- Name: proveedor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reto
--

SELECT pg_catalog.setval('proveedor_id_seq', 2, true);


--
-- Data for Name: proveedor_producto; Type: TABLE DATA; Schema: public; Owner: reto
--

COPY proveedor_producto (id, proveedor_id, producto_id, origen, cantidad, precio, embalaje) FROM stdin;
4	1	1	aguachica	3000	2500	100
\.


--
-- Name: proveedor_producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reto
--

SELECT pg_catalog.setval('proveedor_producto_id_seq', 4, true);


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: reto
--

COPY usuario (id, correo, "contraseña", nombre, apellido, codigo, rol) FROM stdin;
5	llulioscesar@gmail.com	$2a$10$IGEol11NTxXkUKvjdjZ/vuXfrd291.EwMdAdMgjanL8y5lFxujoCG	Julio Cesar	Caicedo Santos	full	1
\.


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: reto
--

SELECT pg_catalog.setval('usuario_id_seq', 4, true);


--
-- Name: localidad_codigo_key; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY localidad
    ADD CONSTRAINT localidad_codigo_key UNIQUE (codigo);


--
-- Name: localidad_pkey; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY localidad
    ADD CONSTRAINT localidad_pkey PRIMARY KEY (id);


--
-- Name: producto_codigo_key; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto
    ADD CONSTRAINT producto_codigo_key UNIQUE (codigo);


--
-- Name: producto_localidad_localidad_id_producto_id_key; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto_localidad
    ADD CONSTRAINT producto_localidad_localidad_id_producto_id_key UNIQUE (localidad_id, producto_id);


--
-- Name: producto_localidad_pkey; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto_localidad
    ADD CONSTRAINT producto_localidad_pkey PRIMARY KEY (id);


--
-- Name: producto_pkey; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id);


--
-- Name: proveedor_codigo_key; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor
    ADD CONSTRAINT proveedor_codigo_key UNIQUE (codigo);


--
-- Name: proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (id);


--
-- Name: proveedor_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor_producto
    ADD CONSTRAINT proveedor_producto_pkey PRIMARY KEY (id);


--
-- Name: proveedor_producto_proveedor_id_producto_id_key; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor_producto
    ADD CONSTRAINT proveedor_producto_proveedor_id_producto_id_key UNIQUE (proveedor_id, producto_id);


--
-- Name: usuario_correo_key; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);


--
-- Name: usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: producto_localidad_localidad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto_localidad
    ADD CONSTRAINT producto_localidad_localidad_id_fkey FOREIGN KEY (localidad_id) REFERENCES localidad(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: producto_localidad_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY producto_localidad
    ADD CONSTRAINT producto_localidad_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES producto(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: proveedor_producto_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor_producto
    ADD CONSTRAINT proveedor_producto_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES producto(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: proveedor_producto_proveedor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: reto
--

ALTER TABLE ONLY proveedor_producto
    ADD CONSTRAINT proveedor_producto_proveedor_id_fkey FOREIGN KEY (proveedor_id) REFERENCES proveedor(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

