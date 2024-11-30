CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(500),
    name VARCHAR(100),
    category VARCHAR(50),
    release_date DATE,
    price DECIMAL(10,2),
    brand VARCHAR(50),
    available BOOLEAN,
    stock_quantity INT
); 