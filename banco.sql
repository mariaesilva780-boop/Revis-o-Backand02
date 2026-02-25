/*CREATE DATABASE escola;
USE escola;


CREATE TABLE alunos(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	NOME VARCHAR(120) NOT NULL
);

INSERT INTO alunos (NOME) VALUES
('Jansen'),
('Matteo'),
('Vitor'),
('Pedro');


CREATE TABLE cursos (
	ID INT AUTO_INCREMENT PRIMARY KEY,
	NOME_CURSO VARCHAR(120) NOT NULL
);

INSERT INTO cursos (NOME_CURSO) VALUES
('Informatica'),
('Administracao'),
('Enfermagem');


CREATE TABLE matriculas ( 
  ID INT AUTO_INCREMENT PRIMARY KEY,
  ALUNO_ID INT,
  CURSO_ID INT,
  
  FOREIGN KEY (ALUNO_ID) REFERENCES alunos(id),
  FOREIGN KEY (CURSO_ID) REFERENCES cursos(id)
);

INSERT INTO matriculas (ALUNO_ID, CURSO_ID) VALUES
(1,1),
(2,1),
(3,2),
(1,2),
(4,3);


SELECT 
	alunos.nome AS aluno,
	cursos.nome_curso AS curso
FROM matriculas
INNER JOIN alunos ON matriculas.aluno_id = alunos.id
INNER JOIN cursos ON matriculas.curso_id = cursos.id; */
