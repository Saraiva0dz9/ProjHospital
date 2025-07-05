namespace ApiHospital.Models;

public class Atendimento
{
    public int ID { get; set; } = 0;
    public int NumeroSequencial { get; set; } = 0;
    public int PacienteId { get; set; } = 0;
    public DateTime DataHoraChegada { get; set; } = DateTime.Now;
    public string Status { get; set; } = string.Empty;
}