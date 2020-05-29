--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Ubuntu 11.7-0ubuntu0.19.10.1)
-- Dumped by pg_dump version 11.7 (Ubuntu 11.7-0ubuntu0.19.10.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: dani
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    user_id integer,
    privat boolean DEFAULT false
);


ALTER TABLE public.boards OWNER TO dani;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: dani
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO dani;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dani
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: dani
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    board_id integer NOT NULL,
    title character varying(255) NOT NULL,
    status_id integer NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    archive boolean DEFAULT false NOT NULL
);


ALTER TABLE public.cards OWNER TO dani;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: dani
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO dani;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dani
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: dani
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.statuses OWNER TO dani;

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: dani
--

CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statuses_id_seq OWNER TO dani;

--
-- Name: statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dani
--

ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dani
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text,
    email text
);


ALTER TABLE public.users OWNER TO dani;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dani
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO dani;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dani
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: statuses id; Type: DEFAULT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: dani
--

COPY public.boards (id, title, user_id, privat) FROM stdin;
52	Test	3	f
56	ewewewe	3	f
57	ewewewew	3	f
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: dani
--

COPY public.cards (id, board_id, title, status_id, "order", archive) FROM stdin;
292	52	in progress	3	0	f
294	52	name me	1	0	f
295	52	name me	0	0	f
296	52	name me	2	0	f
293	52	name me	0	0	t
\.


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: dani
--

COPY public.statuses (id, title) FROM stdin;
0	new
1	in progress
2	testing
3	done
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dani
--

COPY public.users (id, username, password, email) FROM stdin;
1	kukac	$2b$12$cUXH241DeksaDeFhBtKxju0jBBEh2qrS5yDkAX.ZFcmt13O4akplq	kukac@kukac.com
2	kek	$2b$12$fF.WOFzFB0z3kjkmFJdRmeQ2s5KsbbbuzLbGdMIsNl5yCdGi9jrmu	kek@kek.com
3	test	$2b$12$D49wZDggZeql2fxvTZSmB.MWQQqaoG7f6VUk6OOh/F/vaV8WvlIFC	test@test.com
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dani
--

SELECT pg_catalog.setval('public.boards_id_seq', 57, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dani
--

SELECT pg_catalog.setval('public.cards_id_seq', 296, true);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dani
--

SELECT pg_catalog.setval('public.statuses_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dani
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: boards boards_pk; Type: CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pk PRIMARY KEY (id);


--
-- Name: cards cards_pk; Type: CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pk PRIMARY KEY (id);


--
-- Name: statuses statuses_pk; Type: CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: boards_id_uindex; Type: INDEX; Schema: public; Owner: dani
--

CREATE UNIQUE INDEX boards_id_uindex ON public.boards USING btree (id);


--
-- Name: cards_id_uindex; Type: INDEX; Schema: public; Owner: dani
--

CREATE UNIQUE INDEX cards_id_uindex ON public.cards USING btree (id);


--
-- Name: statuses_id_uindex; Type: INDEX; Schema: public; Owner: dani
--

CREATE UNIQUE INDEX statuses_id_uindex ON public.statuses USING btree (id);


--
-- Name: users_id_uindex; Type: INDEX; Schema: public; Owner: dani
--

CREATE UNIQUE INDEX users_id_uindex ON public.users USING btree (id);


--
-- Name: boards boards_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cards cards_boards_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_boards_id_fk FOREIGN KEY (board_id) REFERENCES public.boards(id) ON DELETE CASCADE;


--
-- Name: cards cards_statuses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: dani
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_statuses_id_fk FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- PostgreSQL database dump complete
--

