CREATE TABLE "product" (
  "id" serial,
  "name" varchar,
  "slogan" varchar,
  "description" varchar,
  "category" varchar,
  "default_price" int,
  PRIMARY KEY(id)
);

CREATE TABLE "question" (
  "id" serial,
  "product_id" int NOT NULL,
  "body" varchar,
  "date_written" bigint,
  "asker_name" varchar,
  "asker_email" varchar,
  "reported" int,
  "helpful" int,
  PRIMARY KEY(id)
);

CREATE TABLE "answer" (
  "id" serial,
  "question_id" int NOT NULL,
  "body" varchar,
  "date_written" bigint,
  "answerer_name" varchar,
  "answerer_email" varchar,
  "reported" int,
  "helpful" int,
  PRIMARY KEY(id)
);

CREATE TABLE "photo" (
  "id" serial,
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
-- ALTER TABLE question
-- ALTER COLUMN date_written SET DATA TYPE timestamp with time zone
-- USING
-- timestamp with time zone 'epoch' + date_written * interval '1 millisecond';
-- ALTER TABLE answer
-- ALTER COLUMN date_written SET DATA TYPE timestamp with time zone
-- USING
-- timestamp with time zone 'epoch' + date_written * interval '1 millisecond';

/* Add index for foreign key */
CREATE INDEX product_id_idx ON question(product_id);
CREATE INDEX question_id_idx ON answer(question_id);
CREATE INDEX answer_id_idx ON photo(answer_id);

/* unique constraint*/
-- SELECT setval('"photo_id_seq"', (SELECT MAX(id) FROM public."photo")+1);
-- SELECT setval('"answer_id_seq"', (SELECT MAX(id) FROM public."answer")+1);
-- SELECT setval('"question_id_seq"', (SELECT MAX(id) FROM public."question")+1);

