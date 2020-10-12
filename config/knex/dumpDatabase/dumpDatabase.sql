create table users (
	id serial primary key,
	email varchar(255) not null,
	firstname varchar(255) not null,
	lastname varchar(255) not null,
	username varchar(255) unique not null,
	password varchar(255) not null,
	created_on timestamp not null,
	active boolean default true not null
);

create table roles (
	id serial primary key,
	description varchar(255) not null
);

INSERT INTO roles
(id, description)
VALUES(1, 'ADMIN');
INSERT INTO roles
(id, description)
VALUES(2, 'USER');

create table user_roles (
    role_id int not null,
    user_id int not null,
    CONSTRAINT fk_role
      FOREIGN KEY(role_id) 
	  REFERENCES roles(id),
    CONSTRAINT fk_users
      FOREIGN key(user_id) 
	  REFERENCES users(id)
);

create table movies (
	id serial primary key,
	name varchar(255) not null,
	gender varchar(255) not null,
	directors varchar(255) not null,
	description varchar not null,
	release_year varchar(4) not null,
	stars varchar not null
);


create table rating (
	movies_id int not null,
	user_id int not null,
	rating int not null,
	CONSTRAINT fk_movies
      FOREIGN KEY(movies_id) 
	  REFERENCES movies(id),
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id),
	  UNIQUE(user_id, movies_id)
);

