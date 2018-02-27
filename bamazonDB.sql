drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products (
	item_id integer auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100),
    price decimal(10,2), 
    stock_quantity integer not null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('Mac Lipstick', 'Makeup',18.00, 21), ('Moleskin Journal', 'Office', 20.00,  3), ('Starbucks Mug', 'Home', 6.00, 89), ('Urban Decay Eyeliner', 'Makeup', 15.00, 14), ('Stuffed Animal Dolphint', 'Kids', 30.00, 323);

