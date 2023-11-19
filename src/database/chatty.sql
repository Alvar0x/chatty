drop database if exists chatty;
create database chatty;

use chatty;

create table users (
    id binary(16) primary key default (uuid_to_bin(uuid())),
    name varchar(20) unique not null,
    email varchar(36) unique not null,
    password varchar(60) not null,
    image varchar(100),
    createdAt timestamp not null default (now())
);

create table `groups` (
    id binary(16) primary key default (uuid_to_bin(uuid())),
    name varchar(20) not null,
    createdAt timestamp not null default (now())
);

create table messages (
    id binary(16) primary key default (uuid_to_bin(uuid())),
    content text not null,
    userId binary(16) references users(id),
    groupId binary(16) references `groups`(id),
    createdAt timestamp not null default (now())
);

create table usersGroups (
    userId binary(16) references users(id),
    groupId binary(16) references `groups`(id),
    role varchar(5) not null default ('user'),
    primary key (userId, groupId)
);

insert into users (username, email, password) values ('Alvar0x', 'kosako197@gmail.com', '$2b$10$RSVUX2OPAInbpcf3tdi70.jZjgsGbGbBgC1xkSCMCusnA1As2l12O');

insert into `groups` (name) values ('Grupito');
insert into `groups` (name) values ('Fiesta domingo');
insert into `groups` (name) values ('2º Bachillerato');

insert into usersGroups (userId, groupId, role) values ((select id from users where username = 'Alvar0x'), (select id from `groups` where name = 'Grupito'), 'admin');