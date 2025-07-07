CREATE TABLE Atendimentos (
    ID INT PRIMARY KEY IDENTITY(1,1),
    NumeroSequencial INT NOT NULL, 
    PacienteID INT NOT NULL,
    DataHoraChegada DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) CHECK (Status IN ('Aguardando', 'Em Triagem', 'Em Atendimento', 'Finalizado', 'Cancelado')),
    CONSTRAINT FK_Atendimentos_Pacientes FOREIGN KEY (PacienteID) REFERENCES Pacientes(ID)
);