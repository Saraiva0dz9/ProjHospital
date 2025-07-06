namespace ApiHospital.Models;

public class Paciente
{
   public int ID { get; set; } = 0;
   public string Nome { get; set; } = string.Empty;
   
   private string _telefone = string.Empty;
   private string _email = string.Empty;

   public string Telefone
   {
      get => _telefone;
      set => _telefone = value;
   }
   public string Email
   {
      get => _email;
      set => _email = value;
   }
   
   public string Sexo { get; set; } = string.Empty;
}