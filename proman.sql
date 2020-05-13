create table boards
(
	id serial not null,
	title varchar(255) not null
);

create unique index boards_id_uindex
	on boards (id);

alter table boards
	add constraint boards_pk
		primary key (id);


create table statuses
(
	id serial not null,
	title varchar(255) not null
);

create unique index statuses_id_uindex
	on statuses (id);

alter table statuses
	add constraint statuses_pk
		primary key (id);


create table cards
(
	id serial not null,
	board_id int not null
		constraint cards_boards_id_fk
			references boards,
	title varchar(255) not null,
	status_id int not null
		constraint cards_statuses_id_fk
			references statuses,
	"order" int default 0 not null
);

create unique index cards_id_uindex
	on cards (id);

alter table cards
	add constraint cards_pk
		primary key (id);


