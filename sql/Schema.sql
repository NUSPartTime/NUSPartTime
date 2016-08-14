CREATE TABLE User (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  description TEXT
);

CREATE TABLE Student (
  id INTEGER PRIMARY KEY REFERENCES User(id),
  matric VARCHAR(255) NOT NULL
);

CREATE TABLE Company (
  id INTEGER PRIMARY KEY REFERENCES User(id)
);

CREATE TABLE Job (
  id INTEGER PRIMARY KEY,
  company_id INTEGER,
  title VARCHAR(255) ,
  description TEXT,
  status		int,
  FOREIGN KEY (company_id) REFERENCES Company(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Interest (
  id INTEGER PRIMARY KEY,
  student_id INTEGER,
  job_id INTEGER,
  status INTEGER,
  FOREIGN KEY (student_id) REFERENCES Student(id) on DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES Job(id) on DELETE CASCADE
);
