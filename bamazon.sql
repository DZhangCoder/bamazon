DROP DATABASE IF EXISTS bamazon; 
CREATE DATABASE bamazon;
USE bamazon; 

CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(10),
  PRIMARY KEY(item_id)
); 

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Watercolor Painting Kit","Arts",19.99,200),
("Toilet Paper","Household",20,300),
("Eye drops","Health",10.84,500),
("Eyebrows Trimmer","Beauty",15.99,30),
("Apple iMac","Computers",999.99, 100),
("Coding Interview","Books", 27.88,20),
("Facial Roller","Beauty", 19.99, 40),
("Nitendo Console","Games",55.88,190),
("Sandal","Clothing",150,28),
("Baby wipes","Selfcare",10.99, 280); 

SELECT * FROM products; 