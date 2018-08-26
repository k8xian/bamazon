drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
	id integer(11) auto_increment not null,
    product_name varchar(50) not null,
    department_name varchar(50),
    price float(4,2) not null,
    stock_quantity integer(10) not null,
    primary key (id)
);