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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: allocation_plan_budget_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE allocation_plan_budget_items (
    id integer NOT NULL,
    allocation_plan_id integer NOT NULL,
    budget_item_id integer NOT NULL,
    amount_budgeted numeric(10,2) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
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
-- Name: allocation_plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE allocation_plans (
    id integer NOT NULL,
    budget_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    income numeric(10,2) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
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
-- Name: annual_budget_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE annual_budget_items (
    id integer NOT NULL,
    annual_budget_id integer NOT NULL,
    name character varying NOT NULL,
    due_date date NOT NULL,
    amount numeric(10,2) NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    payment_intervals integer DEFAULT 12 NOT NULL
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
-- Name: annual_budgets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE annual_budgets (
    id integer NOT NULL,
    user_id integer NOT NULL,
    year integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT year_range CHECK (((year >= 2013) AND (year <= 2100)))
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
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: budget_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE budget_categories (
    id integer NOT NULL,
    budget_id integer NOT NULL,
    name character varying NOT NULL,
    percentage character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
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
-- Name: budget_item_expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE budget_item_expenses (
    id integer NOT NULL,
    budget_item_id integer NOT NULL,
    name character varying NOT NULL,
    amount numeric(10,2) NOT NULL,
    date date NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
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
-- Name: budget_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE budget_items (
    id integer NOT NULL,
    budget_category_id integer NOT NULL,
    name character varying NOT NULL,
    amount_budgeted numeric(10,2) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
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
-- Name: budgets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE budgets (
    id integer NOT NULL,
    month integer NOT NULL,
    monthly_income numeric(10,2) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer NOT NULL,
    year integer NOT NULL,
    CONSTRAINT verify_month CHECK (((month >= 1) AND (month <= 12))),
    CONSTRAINT verify_year CHECK (((year >= 2013) AND (year <= 2200)))
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
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE sessions (
    authentication_key uuid DEFAULT gen_random_uuid() NOT NULL,
    authentication_token character varying NOT NULL,
    user_id integer NOT NULL,
    ip character varying NOT NULL,
    user_agent character varying NOT NULL,
    expired_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
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
    last_sign_in_ip character varying,
    avatar_file_name character varying,
    avatar_content_type character varying,
    avatar_file_size integer,
    avatar_updated_at timestamp without time zone
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
-- Name: allocation_plan_budget_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plan_budget_items
    ADD CONSTRAINT allocation_plan_budget_items_pkey PRIMARY KEY (id);


--
-- Name: allocation_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plans
    ADD CONSTRAINT allocation_plans_pkey PRIMARY KEY (id);


--
-- Name: annual_budget_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY annual_budget_items
    ADD CONSTRAINT annual_budget_items_pkey PRIMARY KEY (id);


--
-- Name: annual_budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY annual_budgets
    ADD CONSTRAINT annual_budgets_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: budget_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_categories
    ADD CONSTRAINT budget_categories_pkey PRIMARY KEY (id);


--
-- Name: budget_item_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_item_expenses
    ADD CONSTRAINT budget_item_expenses_pkey PRIMARY KEY (id);


--
-- Name: budget_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_items
    ADD CONSTRAINT budget_items_pkey PRIMARY KEY (id);


--
-- Name: budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (id);


--
-- Name: index_budgets_on_user_id_and_year_and_month; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budgets
    ADD CONSTRAINT index_budgets_on_user_id_and_year_and_month UNIQUE (user_id, year, month);


--
-- Name: sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (authentication_key);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: active_sessions_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX active_sessions_idx ON sessions USING btree (authentication_key) WHERE (expired_at IS NULL);


--
-- Name: allocation_plan_bdgt_itms_alc_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX allocation_plan_bdgt_itms_alc_id_idx ON allocation_plan_budget_items USING btree (allocation_plan_id);


--
-- Name: allocation_plan_bdgt_itms_budget_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX allocation_plan_bdgt_itms_budget_id_idx ON allocation_plan_budget_items USING btree (budget_item_id);


--
-- Name: allocation_plans_budget_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX allocation_plans_budget_id_idx ON allocation_plans USING btree (budget_id);


--
-- Name: annual_budget_items_budget_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX annual_budget_items_budget_id_idx ON annual_budget_items USING btree (annual_budget_id);


--
-- Name: annual_budgets_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX annual_budgets_user_id_idx ON annual_budgets USING btree (user_id);


--
-- Name: budget_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX budget_id_idx ON budget_categories USING btree (budget_id);


--
-- Name: budget_item_expenses_item_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX budget_item_expenses_item_idx ON budget_item_expenses USING btree (budget_item_id);


--
-- Name: budget_items_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX budget_items_category_idx ON budget_items USING btree (budget_category_id);


--
-- Name: budgets_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX budgets_user_id_idx ON budgets USING btree (user_id);


--
-- Name: index_annual_budgets_on_user_id_and_year; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_annual_budgets_on_user_id_and_year ON annual_budgets USING btree (user_id, year);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_idx ON sessions USING btree (user_id);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: allocation_budget_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plans
    ADD CONSTRAINT allocation_budget_foreign_key FOREIGN KEY (budget_id) REFERENCES budgets(id);


--
-- Name: allocation_budget_itm_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plan_budget_items
    ADD CONSTRAINT allocation_budget_itm_foreign_key FOREIGN KEY (budget_item_id) REFERENCES budget_items(id);


--
-- Name: allocation_pln_budget_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY allocation_plan_budget_items
    ADD CONSTRAINT allocation_pln_budget_foreign_key FOREIGN KEY (allocation_plan_id) REFERENCES allocation_plans(id);


--
-- Name: annual_budget_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY annual_budget_items
    ADD CONSTRAINT annual_budget_foreign_key FOREIGN KEY (annual_budget_id) REFERENCES annual_budgets(id);


--
-- Name: annual_user_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY annual_budgets
    ADD CONSTRAINT annual_user_foreign_key FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: budget_category_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_items
    ADD CONSTRAINT budget_category_foreign_key FOREIGN KEY (budget_category_id) REFERENCES budget_categories(id);


--
-- Name: budget_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_categories
    ADD CONSTRAINT budget_id_foreign_key FOREIGN KEY (budget_id) REFERENCES budgets(id);


--
-- Name: budget_item_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budget_item_expenses
    ADD CONSTRAINT budget_item_foreign_key FOREIGN KEY (budget_item_id) REFERENCES budget_items(id);


--
-- Name: sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: user_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY budgets
    ADD CONSTRAINT user_foreign_key FOREIGN KEY (user_id) REFERENCES users(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO schema_migrations (version) VALUES ('20130309203554'), ('20130309203611'), ('20130309203620'), ('20130309203629'), ('20130312024021'), ('20130312033713'), ('20130313023406'), ('20130614194616'), ('20130908170524'), ('20140228021003'), ('20140228021734'), ('20140305123349'), ('20140306011622'), ('20150222232818'), ('20150222235043'), ('20151010144448'), ('20151221065100'), ('20160113144631'), ('20160127002618'), ('20170319163530');


