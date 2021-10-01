CREATE TABLE "product" (
  "id" serial NOT NULL,
  "name" varchar,
  "slogan" varchar,
  "description" varchar,
  "category" varchar,
  "default_price" int,
  PRIMARY KEY(id)
);

CREATE TABLE "question" (
  "id" serial not null,
  "product_id" int NOT NULL,
  "body" varchar,
  "date_written" timestamptz NOT NULL,
  "asker_name" varchar,
  "asker_email" varchar,
  "reported" int,
  "helpful" int,
  PRIMARY KEY(id)
);

CREATE TABLE "answer" (
  "id" serial not null,
  "question_id" int NOT NULL,
  "body" varchar,
  "date_written" timestamptz NOT NULL,
  "answerer_name" varchar,
  "answerer_email" varchar,
  "reported" int,
  "helpful" int,
  PRIMARY KEY(id)
);

CREATE TABLE "photo" (
  "id" serial not null,
  "answer_id" int NOT NULL,
  "url" text,
   PRIMARY KEY(id)
);

/* Relation */

ALTER TABLE "answer" ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");
ALTER TABLE "photo" ADD FOREIGN KEY ("answer_id") REFERENCES "answer" ("id");
ALTER TABLE "question" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

/*copy over data from .csv files into tables */
copy product (id,name,slogan,description,category,default_price) from '/Users/vannguyen/work/Midna-QA/diagram/SDC/product.csv' DELIMITER ',' CSV HEADER;
copy question (id,product_id,body,date_written,asker_name,asker_email,reported,helpful) from '/Users/vannguyen/work/Midna-QA/diagram/SDC/questions.csv' DELIMITER ',' CSV HEADER;
copy answer (id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful) from '/Users/vannguyen/work/Midna-QA/diagram/SDC/answers.csv' DELIMITER ',' CSV HEADER;
copy photo (id,answer_id,url) from '/Users/vannguyen/work/Midna-QA/diagram/SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;



/* change date timestamp format */
ALTER TABLE question
ALTER COLUMN date_written SET DATA TYPE timestamp with time zone
USING
timestamp with time zone 'epoch' + date_written * interval '1 millisecond';
ALTER TABLE answer
ALTER COLUMN date_written SET DATA TYPE timestamp with time zone
USING
timestamp with time zone 'epoch' + date_written * interval '1 millisecond';

