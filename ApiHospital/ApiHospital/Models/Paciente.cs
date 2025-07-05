namespace ApiHospital.Models;

public class Paciente
{
   public int ID { get; set; } = 0;
   public string Nome { get; set; } = string.Empty;
   public string Telefone { get; set; } = string.Empty;
   public string Sexo { get; set; } = string.Empty;
   public string Email { get; set; } = string.Empty; 
}