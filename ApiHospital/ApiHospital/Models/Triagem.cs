namespace ApiHospital.Models;

public class Triagem
{
    public int ID { get; set; } = 0;
    public int AtendimentoId { get; set; } = 0;
    public string Sintomas { get; set; } = string.Empty;
    public string PressaoArterial { get; set; } = string.Empty;
    public decimal Peso { get; set; } = 0.0m;
}