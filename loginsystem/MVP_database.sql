use FlashSale;
  
-- Create the Buyer table
CREATE TABLE Buyer (
    Account VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(50)
);

-- Create the Seller table
CREATE TABLE Seller (
    Account VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(50)
);

-- Create the Product table
CREATE TABLE Product (
    ID INT PRIMARY KEY,
    Name VARCHAR(50),
    Price DECIMAL(10, 2),
    Quantity INT,
    SaleStartTime TIMESTAMP
);