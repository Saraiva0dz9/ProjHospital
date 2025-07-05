CREATE TABLE Triagem (
    ID INT PRIMARY KEY IDENTITY(1,1),
    AtendimentoID INT NOT NULL,
    Sintomas NVARCHAR(500),
    PressaoArterial NVARCHAR(10), -- Ex: "120/80"
    Peso DECIMAL(5,2), -- Em kg
    Altura DECIMAL(3,2), -- Em metros
    EspecialidadeID INT, -- FK para uma tabela de especialidades (se existir)
    CONSTRAINT FK_Triagem_Atendimentos FOREIGN KEY (AtendimentoID) REFERENCES Atendimentos(ID)
);