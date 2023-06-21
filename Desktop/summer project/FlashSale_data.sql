Create database FlashSale;
use FlashSale;
  
-- Create the Buyer table
CREATE TABLE Users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) not null,
    password VARCHAR(50) not null
);

-- Create the Seller table
CREATE TABLE Sellers (
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) not null,
    password VARCHAR(50) not null
);

-- Create the Product table
CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sellerID INT not null,
    Name VARCHAR(50) not null,
    img VARCHAR(50) not null,
    detail LONGTEXT ,
    price DECIMAL(10, 2) not null,
    stock INT not null,
    saleStartTime datetime not null,
    saleEndTime datetime not null,
    FOREIGN KEY (sellerID) REFERENCES Sellers(id)
);

CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uderId INT not null,
    productID INT not null,
    amount INT not null,
	FOREIGN KEY (uderId) REFERENCES Users(id),
    FOREIGN KEY (productID) REFERENCES Products(id)
);
