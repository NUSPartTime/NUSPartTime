-- insert into DB via command line for testing

insert into Users values
-- id, name, address, phone, email, description
(1, "Test User 001", "Clementi", "90785634", "abc@testing.com", "I'm a good test player.", "2016-08-18", "2016-08-18"), 
(2, "Test User 002", "Clementi", "12345678", "xyz@testing.com", "I'm a good test player too.", "2016-08-18", "2016-08-18"), 
(4, "Test User 004", "", "", "", "", "2016-08-18", "2016-08-18")
;

insert into Students values
-- id, matric
(1, "A0123456B", "2016-08-18", "2016-08-18"),
(4, "A0134567C", "2016-08-18", "2016-08-18")
;

insert into Employers values
-- id
(2, "2016-08-18", "2016-08-18")
;

insert into Companies values
-- id, name, address, email, description, registerDate
(1, "Google", "4 Siglap", "12345678", "www.google.com", "Diao de bu xing", "2016-08-18", "2016-08-18")
;

insert into CompanyContacts values
-- id, employer_id, company_id
(1, 2, 1, "2016-08-18", "2016-08-18")
;

insert into Jobs values
-- id, company_id, title, description, status, salary, applicationDeadline, deadline
(1, 1, "Front-end AngularJS developer", 1, 100, "GLHF", "2016-09-18", "2016-11-18", "2016-08-18", "2016-08-18"),
(2, 1, "Back-end JavaEE developer", 1, 200, "GLHF :)", "2016-10-18", "2016-12-18", "2016-08-18", "2016-08-18")
;

insert into StudentJobs values
-- id, student_id, job_id, status
(1, 4, 1, 1, "2016-08-18", "2016-08-18"),
(2, 1, 2, 0, "2016-08-18", "2016-08-18")
;

insert into Categories values
-- id, name
(1, "Front-end developer", "2016-08-18", "2016-08-18"),
(2, "Back-end developer", "2016-08-18", "2016-08-18")
;

insert into JobCategories values
-- id, jobId, categoryId, name
(1, 1, 1, "2016-08-18", "2016-08-18"),
(2, 2, 2, "2016-08-18", "2016-08-18")
;