--
-- PostgreSQL database dump
--

-- Dumped from database version 17.10 (4f20678)
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: update_date_updated_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_date_updated_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.date_updated = now();
   RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accessories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accessories (
    accessory_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- Name: customization_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customization_options (
    customization_option_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- Name: filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.filters (
    filter_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- Name: isotopes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.isotopes (
    isotope_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- Name: popular_products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.popular_products (
    popular_product_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    "order" integer NOT NULL
);


--
-- Name: product_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_events (
    product_event_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    event_type character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT product_events_event_type_check CHECK (((event_type)::text = ANY ((ARRAY['view'::character varying, 'inquiry'::character varying, 'cart_add'::character varying])::text[])))
);


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_images (
    image_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    src character varying NOT NULL,
    display_order integer NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    product_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    features character varying[],
    material character varying,
    date_created date DEFAULT now() NOT NULL,
    date_updated date
);


--
-- Name: products_accessories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_accessories (
    product_accessory_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    accessory_id uuid NOT NULL,
    filter_id uuid NOT NULL
);


--
-- Name: products_customization_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_customization_options (
    product_customization_option_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    customization_option_id uuid NOT NULL,
    filter_id uuid NOT NULL
);


--
-- Name: products_faqs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_faqs (
    product_faq_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    question character varying NOT NULL,
    answer character varying NOT NULL
);


--
-- Name: products_isotopes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_isotopes (
    product_isotope_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    isotope_id uuid NOT NULL,
    filter_id uuid NOT NULL
);


--
-- Name: products_purchased_together; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_purchased_together (
    product_purchased_together_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    purchased_together_product_id uuid NOT NULL
);


--
-- Name: products_related; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_related (
    product_related_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    related_product_id uuid NOT NULL
);


--
-- Name: products_shields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_shields (
    product_shield_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid,
    shield_id uuid,
    filter_id uuid
);


--
-- Name: products_usages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_usages (
    product_usage_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    usage_id uuid NOT NULL,
    filter_id uuid NOT NULL
);


--
-- Name: products_volume_metrics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_volume_metrics (
    product_metric_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    volume_id uuid NOT NULL,
    weight numeric NOT NULL,
    height numeric NOT NULL,
    inner_diameter numeric NOT NULL,
    outer_diameter numeric NOT NULL,
    shielding_side numeric NOT NULL,
    shielding_side_pb_equiv numeric NOT NULL,
    top_shield numeric NOT NULL,
    top_shield_pb_equiv numeric NOT NULL,
    bottom numeric NOT NULL,
    bottom_pb_equiv numeric NOT NULL,
    part_number character varying
);


--
-- Name: products_volumes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_volumes (
    product_volume_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_id uuid NOT NULL,
    volume_id uuid NOT NULL,
    filter_id uuid NOT NULL
);


--
-- Name: shields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shields (
    shield_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- Name: usages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usages (
    usage_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    image character varying
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(225) NOT NULL,
    profile_image character varying NOT NULL
);


--
-- Name: volumes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.volumes (
    volume_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


--
-- Name: accessories accessories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accessories
    ADD CONSTRAINT accessories_pkey PRIMARY KEY (accessory_id);


--
-- Name: customization_options customization_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customization_options
    ADD CONSTRAINT customization_options_pkey PRIMARY KEY (customization_option_id);


--
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (filter_id);


--
-- Name: isotopes isotopes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.isotopes
    ADD CONSTRAINT isotopes_pkey PRIMARY KEY (isotope_id);


--
-- Name: popular_products popular_products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.popular_products
    ADD CONSTRAINT popular_products_pkey PRIMARY KEY (popular_product_id);


--
-- Name: product_events product_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_events
    ADD CONSTRAINT product_events_pkey PRIMARY KEY (product_event_id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (image_id);


--
-- Name: products_accessories products_accessories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_accessories
    ADD CONSTRAINT products_accessories_pkey PRIMARY KEY (product_accessory_id);


--
-- Name: products_customization_options products_customization_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_customization_options
    ADD CONSTRAINT products_customization_options_pkey PRIMARY KEY (product_customization_option_id);


--
-- Name: products_faqs products_faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_faqs
    ADD CONSTRAINT products_faqs_pkey PRIMARY KEY (product_faq_id);


--
-- Name: products_isotopes products_isotopes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_isotopes
    ADD CONSTRAINT products_isotopes_pkey PRIMARY KEY (product_isotope_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: products_purchased_together products_purchased_together_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_purchased_together
    ADD CONSTRAINT products_purchased_together_pkey PRIMARY KEY (product_purchased_together_id);


--
-- Name: products_related products_related_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_related
    ADD CONSTRAINT products_related_pkey PRIMARY KEY (product_related_id);


--
-- Name: products_shields products_shields_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_shields
    ADD CONSTRAINT products_shields_pkey PRIMARY KEY (product_shield_id);


--
-- Name: products_usages products_usages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usages
    ADD CONSTRAINT products_usages_pkey PRIMARY KEY (product_usage_id);


--
-- Name: products_volume_metrics products_volume_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volume_metrics
    ADD CONSTRAINT products_volume_metrics_pkey PRIMARY KEY (product_metric_id);


--
-- Name: products_volumes products_volumes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volumes
    ADD CONSTRAINT products_volumes_pkey PRIMARY KEY (product_volume_id);


--
-- Name: shields shields _pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shields
    ADD CONSTRAINT "shields _pkey" PRIMARY KEY (shield_id);


--
-- Name: usages usages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usages
    ADD CONSTRAINT usages_pkey PRIMARY KEY (usage_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: volumes volumes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.volumes
    ADD CONSTRAINT volumes_pkey PRIMARY KEY (volume_id);


--
-- Name: product_events_product_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX product_events_product_id_idx ON public.product_events USING btree (product_id);


--
-- Name: products set_date_updated; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_date_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_date_updated_column();


--
-- Name: products_accessories accessory_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_accessories
    ADD CONSTRAINT accessory_id FOREIGN KEY (accessory_id) REFERENCES public.accessories(accessory_id);


--
-- Name: products_customization_options customization_option_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_customization_options
    ADD CONSTRAINT customization_option_id FOREIGN KEY (customization_option_id) REFERENCES public.customization_options(customization_option_id) NOT VALID;


--
-- Name: products_isotopes filter_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_isotopes
    ADD CONSTRAINT filter_id FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id) NOT VALID;


--
-- Name: products_volumes filter_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volumes
    ADD CONSTRAINT filter_id FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id);


--
-- Name: products_shields filter_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_shields
    ADD CONSTRAINT filter_id FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id);


--
-- Name: products_accessories filter_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_accessories
    ADD CONSTRAINT filter_id FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id);


--
-- Name: products_usages filter_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usages
    ADD CONSTRAINT filter_id FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id);


--
-- Name: products_customization_options filter_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_customization_options
    ADD CONSTRAINT filter_id FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id) NOT VALID;


--
-- Name: products_isotopes isotope_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_isotopes
    ADD CONSTRAINT isotope_id FOREIGN KEY (isotope_id) REFERENCES public.isotopes(isotope_id) NOT VALID;


--
-- Name: product_events product_events_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_events
    ADD CONSTRAINT product_events_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- Name: products_isotopes product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_isotopes
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id) NOT VALID;


--
-- Name: product_images product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_volumes product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volumes
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_shields product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_shields
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_accessories product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_accessories
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_usages product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usages
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_volume_metrics product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volume_metrics
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_faqs product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_faqs
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_related product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_related
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: products_customization_options product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_customization_options
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.products(product_id) NOT VALID;


--
-- Name: products_related products_related_related_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_related
    ADD CONSTRAINT products_related_related_product_id_fkey FOREIGN KEY (related_product_id) REFERENCES public.products(product_id);


--
-- Name: products_shields shield_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_shields
    ADD CONSTRAINT shield_id FOREIGN KEY (shield_id) REFERENCES public.shields(shield_id);


--
-- Name: products_usages usage_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usages
    ADD CONSTRAINT usage_id FOREIGN KEY (usage_id) REFERENCES public.usages(usage_id);


--
-- Name: products_volumes volume_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volumes
    ADD CONSTRAINT volume_id FOREIGN KEY (volume_id) REFERENCES public.volumes(volume_id);


--
-- Name: products_volume_metrics volume_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_volume_metrics
    ADD CONSTRAINT volume_id FOREIGN KEY (volume_id) REFERENCES public.volumes(volume_id);


--
-- PostgreSQL database dump complete
--

