CREATE TABLE public.users(
  id serial primary key NOT NULL,
  date timestamp with time zone not null default current_timestamp,
  name varchar(54) NOT NULL,
  email varchar(99) NOT NULL,
  ssn char(11) NOT NULL,
  amount INT NOT NULL
  );
