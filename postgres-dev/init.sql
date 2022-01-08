BEGIN;
CREATE TABLE IF NOT EXISTS users(
	id serial PRIMARY KEY,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password varchar(255) NOT NULL,
	registration_date DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE cars(
	id serial PRIMARY KEY,
	plate_number varchar(20) NOT NULL,
	brand varchar(50) NOT NULL,
	model varchar(50) NOT NULL,
	price NUMERIC(5,2)NOT NULL
);
CREATE TABLE admin(
	id serial PRIMARY KEY,
	email TEXT UNIQUE NOT NULL,
	password varchar(255) NOT NULL
);
COMMIT;
BEGIN;
CREATE TABLE reservations(
	id serial PRIMARY KEY,
	pick_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	drop_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_id INT NOT NULL,
	car_id INT NOT NULL,
	total NUMERIC NOT NULL,
	pick_location varchar(50) NOT NULL CHECK (pick_location in ('AIRPORT','MIDTOWN')),
	drop_location varchar(50) NOT NULL CHECK (drop_location in ('AIRPORT','MIDTOWN')),
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(car_id) REFERENCES cars(id)
);
COMMIT;