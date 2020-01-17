/* DROP TABLE users;
CREATE TABLE users (
	username NVARCHAR(16) PRIMARY KEY NOT NULL,
	userPassword NVARCHAR(16) NOT NULL,
	firstName NVARCHAR(15) NOT NULL,
	lastName NVARCHAR(15) NOT NULL,
	email NVARCHAR(320) UNIQUE NOT NULL,
	phoneNum INT NULL,
	homeAddress NVARCHAR(MAX) NULL,
	Gender NVARCHAR(10) NULL,
	dob DATE NOT NULL,
	age INT NOT NULL
); 
/*
INSERT INTO users (username, userPassword, firstName, lastName, email, phoneNum, homeAddress, Gender, dob, age)
VALUES ('superSavta', '1234567', 'Michal', 'Kliener', 'michalKlineer@gmail.com', 0546533580, 'עודד', 'נקבה', '1936-04-01', 84) */
*/

SELECT * FROM users;


/* <table id="userInfoTable"><tr><th class="cell">שם משתמש</th><th class="cell">סיסמה</th><th class="cell">שם פרטי</th><th class="cell">שם משפחה</th><th class="cell">כתובת אימייל</th><th class="cell">מספר טלפון</th><th class="cell">כתובת</th><th class="cell">מין</th><th class="cell">תאריך לידה</th></tr><tr><td class="cell">{0}</td><td class="cell">{1</td><td class="cell">{2}</td><td class="cell">{3}</td><td class="cell">{4}</td><td class="cell">{5}</td><td class="cell">{6}</td><td class="cell">{7}</td><td class="cell">{8}</td></tr></table> */