--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: allocation_plan_budget_items; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE allocation_plan_budget_items (
    id integer NOT NULL,
    allocation_plan_id integer,
    budget_item_id integer,
    amount_budgeted numeric(10,2),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: allocation_plan_budget_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE allocation_plan_budget_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: allocation_plan_budget_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE allocation_plan_budget_items_id_seq OWNED BY allocation_plan_budget_items.id;


--
-- Name: allocation_plans; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE allocation_plans (
    id integer NOT NULL,
    budget_id integer,
    start_date date,
    end_date date,
    income numeric(10,2),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: allocation_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE allocation_plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: allocation_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE allocation_plans_id_seq OWNED BY allocation_plans.id;


--
-- Name: annual_budget_items; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE annual_budget_items (
    id integer NOT NULL,
    annual_budget_id integer,
    name character varying,
    due_date date,
    amount numeric(10,2),
    paid boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: annual_budget_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE annual_budget_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: annual_budget_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE annual_budget_items_id_seq OWNED BY annual_budget_items.id;


--
-- Name: annual_budgets; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE annual_budgets (
    id integer NOT NULL,
    user_id integer,
    year integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: annual_budgets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE annual_budgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: annual_budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE annual_budgets_id_seq OWNED BY annual_budgets.id;


--
-- Name: budget_categories; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE budget_categories (
    id integer NOT NULL,
    budget_id integer,
    name character varying,
    percentage character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: budget_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE budget_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budget_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE budget_categories_id_seq OWNED BY budget_categories.id;


--
-- Name: budget_item_expenses; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE budget_item_expenses (
    id integer NOT NULL,
    budget_item_id integer,
    name character varying,
    amount numeric(10,2),
    date date,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: budget_item_expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE budget_item_expenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budget_item_expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE budget_item_expenses_id_seq OWNED BY budget_item_expenses.id;


--
-- Name: budget_items; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE budget_items (
    id integer NOT NULL,
    budget_category_id integer,
    name character varying,
    amount_budgeted numeric(10,2),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    envelope boolean
);


--
-- Name: budget_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE budget_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budget_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE budget_items_id_seq OWNED BY budget_items.id;


--
-- Name: budgets; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE budgets (
    id integer NOT NULL,
    month character varying,
    monthly_income numeric(10,2),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id integer,
    year character varying
);


--
-- Name: budgets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE budgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: budgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE budgets_id_seq OWNED BY budgets.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    password_hash character varying,
    password_salt character varying,
    admin boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    password_reset_token character varying,
    password_reset_sent_at timestamp without time zone,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying,
    last_sign_in_ip character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plan_budget_items ALTER COLUMN id SET DEFAULT nextval('allocation_plan_budget_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plans ALTER COLUMN id SET DEFAULT nextval('allocation_plans_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY annual_budget_items ALTER COLUMN id SET DEFAULT nextval('annual_budget_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY annual_budgets ALTER COLUMN id SET DEFAULT nextval('annual_budgets_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_categories ALTER COLUMN id SET DEFAULT nextval('budget_categories_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_item_expenses ALTER COLUMN id SET DEFAULT nextval('budget_item_expenses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_items ALTER COLUMN id SET DEFAULT nextval('budget_items_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY budgets ALTER COLUMN id SET DEFAULT nextval('budgets_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: allocation_plan_budget_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY allocation_plan_budget_items
    ADD CONSTRAINT allocation_plan_budget_items_pkey PRIMARY KEY (id);


--
-- Name: allocation_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY allocation_plans
    ADD CONSTRAINT allocation_plans_pkey PRIMARY KEY (id);


--
-- Name: annual_budget_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY annual_budget_items
    ADD CONSTRAINT annual_budget_items_pkey PRIMARY KEY (id);


--
-- Name: annual_budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY annual_budgets
    ADD CONSTRAINT annual_budgets_pkey PRIMARY KEY (id);


--
-- Name: budget_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY budget_categories
    ADD CONSTRAINT budget_categories_pkey PRIMARY KEY (id);


--
-- Name: budget_item_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY budget_item_expenses
    ADD CONSTRAINT budget_item_expenses_pkey PRIMARY KEY (id);


--
-- Name: budget_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY budget_items
    ADD CONSTRAINT budget_items_pkey PRIMARY KEY (id);


--
-- Name: budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_annual_budgets_on_user_id_and_year; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX index_annual_budgets_on_user_id_and_year ON annual_budgets USING btree (user_id, year);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user",public;

INSERT INTO schema_migrations (version) VALUES ('20130309203554');

INSERT INTO schema_migrations (version) VALUES ('20130309203611');

INSERT INTO schema_migrations (version) VALUES ('20130309203620');

INSERT INTO schema_migrations (version) VALUES ('20130309203629');

INSERT INTO schema_migrations (version) VALUES ('20130312024021');

INSERT INTO schema_migrations (version) VALUES ('20130312033713');

INSERT INTO schema_migrations (version) VALUES ('20130313023406');

INSERT INTO schema_migrations (version) VALUES ('20130614194616');

INSERT INTO schema_migrations (version) VALUES ('20130908170524');

INSERT INTO schema_migrations (version) VALUES ('20140228021003');

INSERT INTO schema_migrations (version) VALUES ('20140228021734');

INSERT INTO schema_migrations (version) VALUES ('20140305123349');

INSERT INTO schema_migrations (version) VALUES ('20140306011622');

INSERT INTO schema_migrations (version) VALUES ('20150222232818');

INSERT INTO schema_migrations (version) VALUES ('20150222235043');

