CREATE TABLE Migrants(
    Name VARCHAR(255),
    PhoneNumber VARCHAR(255),
    Address VARCHAR(255),
    ZipCode VARCHAR(255),
    Job VARCHAR(255)
);

CREATE TABLE Customers(
    id INTEGER PRIMARY KEY,
    FirstName VARCHAR(255),
    PhoneNumber VARCHAR(255),
    Address VARCHAR(255),
    Jobs VARCHAR(255)
);

db.run('INSERT INTO Migrants VALUES ("Laxman", "9505070175", "Hyderabad","500076","Cook")');
db.run('INSERT INTO Migrants VALUES ("Laxmi", "9505070176", "Hyderabad","500076","Cleaning")');
db.run('INSERT INTO Migrants VALUES ("Ramu", "9505070177", "Hyderabad","500076","Driver")');
db.run('INSERT INTO Migrants VALUES ("Sita", "9505070178", "Hyderabad","500076","Watchman")');
SELECT * FROM Migrants WHERE ZipCode = ? AND Job = ?', [dict[req.body.sender][0],dict[req.body.sender][1]]


INSERT INTO Contacts 
    VALUES (12, 'John', 'Doe',
        'JohnDoe@email.com`, '999-999-9999', '29384'
    );
INSERT INTO Contacts (FirstName, LastName, EmailAddress, PhoneNumber, ZipCode) VALUES ('Thomas', 'Axen', 'taxen@email.com', '111-111-1111', '90110');

SELECT * FROM Contacts;