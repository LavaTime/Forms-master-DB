 DROP TABLE users;
CREATE TABLE users (
	username NVARCHAR(16) PRIMARY KEY NOT NULL,
	userPassword NVARCHAR(16) NOT NULL,
	firstName NVARCHAR(15) NOT NULL,
	lastName NVARCHAR(15) NOT NULL,
	email NVARCHAR(320) UNIQUE NOT NULL,
	phoneNum INT UNIQUE NULL,
	homeAddress NVARCHAR(MAX) NULL,
	Gender NVARCHAR(10) NULL,
	dob DATE NOT NULL,
	age INT NOT NULL
); 
/*
INSERT INTO users (username, userPassword, firstName, lastName, email, phoneNum, homeAddress, Gender, dob, age)
VALUES ('superSavta', '1234567', 'Michal', 'Kliener', 'michalKlineer@gmail.com', 0546533580, 'עודד', 'נקבה', '1936-04-01', 84) */

SELECT * FROM users;