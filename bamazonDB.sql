DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE bamazonProducts (
  position INT NOT NULL,
  product VARCHAR(100) NULL,
  id_number VARCHAR(100) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM bamazonDB;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL,
  `product_name` varchar(150) DEFAULT NULL,
  `department_name` varchar(150) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES 
(1, "Mac Lipstick", "Makeup", 21),
(2, "Moleskin Journal", "Office", 3),
(3, "Starbucks Mug", "Home", 89),
(4, "Urban Decay Eyeliner", "Makeup", 14),
(5, "Stuffed Animal Dolphin", "Kids", 323),
UNLOCK TABLES;