create database question_app;

/*
+------------------------+
| Tables_in_question_app |
+------------------------+
| answers                |
| questions              |
| users                  |
+------------------------+
 */
create table
    answers (
        question_no int primary key auto_increment,
        answer varchar(5)
    );

/*
+-------------+--------+
| question_no | answer |
+-------------+--------+
|           1 | c      |
|           2 | d      |
|           3 | c      |
|           4 | c      |
|           5 | b      |
+-------------+--------+
 */
create table
    questions (
        question varchar(120) not null,
        options varchar(255) not null,
        question_no int primary key auto_increment,
        question_type varchar(30) not null
    );

insert into
    questions (question, options, question_type)
values
    (
        'What is Binary',
        '["Insect","Country","Maths Problem","Computer Number System"]',
        'text'
    ),
    (
        'Calculate the expression 2+2',
        '["9","2/4*7-9","((8*8-50)/2-6+1)*2","-4-(-4*-1)"]',
        'text'
    ),
    (
        'Who is the Humans ? ',
        '["ChatGPT","Gemini","Tamil","LED light"]',
        'text'
    ),
    (
        'Python if statement syntax ?',
        '["include <IF> `Condition${}`","if condition :","__IF__ ${condition} : reusult","py.if.condition & \\"statement\\""]',
        'text'
    );


/*
+------------------------------+--------------------------------------------------------------------------------------------------------------------+-------------+---------------+
| question                     | options                                                                                                            | question_no | question_type |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+-------------+---------------+
| What is transistor           | ["Food","Computer","Electronic Component","Animal"]                                                                |           1 | text          |
| What is Binary               | ["Insect","Country","Maths Problem","Computer Number System"]                                                      |           2 | text          |
| Calculate the expression 2+2 | ["9", "2/4*7-9", "((8*8-50)/2-6+1)*2", "-4-(-4*-1)"]                                                               |           3 | text          |
| Who is the Humans ?          | ["ChatGPT", "Gemini", "Tamil", "LED light"]                                                                        |           4 | text          |
| Python if statement syntax ? | ["include <IF> `Condition${}`","if condition :","__IF__ ${condition} : reusult","py.if.condition & \"statement\""] |           5 | text          |
+------------------------------+--------------------------------------------------------------------------------------------------------------------+-------------+---------------+

*/

/*
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| userId     | varchar(20) | NO   | PRI | NULL    |       |
| userName   | varchar(40) | NO   |     | NULL    |       |
| passowrd   | varchar(20) | NO   |     | NULL    |       |
| phone      | mediumtext  | YES  |     | NULL    |       |
| answers    | varchar(40) | YES  |     | NULL    |       |
| privateKey | varchar(50) | YES  | UNI | NULL    |       |
+------------+-------------+------+-----+---------+-------+
6 rows in set (0.00 sec)

*/

create table users (
    userId varchar(50) primary key,
    userName varchar(50) not null,
    passowrd varchar(50) not null,
    phone BIGINT  not null,
    answers varchar(50) Default '["","","","",""]',
    privateKey varchar(50) unique
);
-- or this one is also ok
CREATE TABLE users (
    userId VARCHAR(50) PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    passowrd VARCHAR(50) NOT NULL,
    phone BIGINT NOT NULL,
    answers VARCHAR(255) DEFAULT '["","","","",""]',
    privateKey VARCHAR(50) UNIQUE
);

INSERT INTO users (userId, userName, passowrd, phone)
VALUES ('22UCS669', 'Pramoth', 'Pramoth@123', 1234567890);

INSERT INTO users (userId, userName, passowrd, phone)
VALUES ('Tamil_0714', 'Tamil', '123@abcd', 9943112938);

INSERT INTO users (userId, userName, passowrd, phone)
VALUES ('tommy123', 'Tom', 'xyz@123', 8124597632);


