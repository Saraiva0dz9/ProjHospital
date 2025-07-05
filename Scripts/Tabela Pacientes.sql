CREATE TABLE Pacientes (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    Telefone NVARCHAR(20),
    Sexo CHAR(1) CHECK (Sexo IN ('M', 'F', 'O')), -- 'O' para outros/outro
    Email NVARCHAR(100)
);