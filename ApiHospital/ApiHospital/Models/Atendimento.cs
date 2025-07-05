namespace ApiHospital.Models;

public class Atendimento
{
    public int Id { get; set; } = 0;
    public int Sequencial { get; set; } = 0;
    public int PacienteId { get; set; } = 0;
    public DateTime DataHora { get; set; } = DateTime.Now;
    public string Status { get; set; } = string.Empty;
}