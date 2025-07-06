using ApiHospital.Context;
using ApiHospital.Models;
using ApiHospital.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiHospital.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacienteController : Controller
{
    private readonly PacienteContext _context;
    private readonly AtendimentoService _atendimentoService;
    private readonly ILogger<PacienteController> _logger;
    private readonly CryptoService _cryptoService;
    
    public PacienteController(PacienteContext context, ILogger<PacienteController> logger,
        AtendimentoService atendimentoService, CryptoService cryptoService)
    {
        this._context = context;
        this._atendimentoService = atendimentoService;
        this._logger = logger;
        this._cryptoService = cryptoService;
    }
    
    [HttpGet("GetPacientes")]
    public ActionResult<IEnumerable<Paciente>> GetPacientes()
    {
        try
        {
            var pacientes = _context.Pacientes.ToList();
            
            // Descriptografa os dados sensíveis antes de retornar
            foreach (var paciente in pacientes)
            {
                paciente.Telefone = _cryptoService.Decrypt(paciente.Telefone);
                paciente.Email = _cryptoService.Decrypt(paciente.Email);
            }
            
            return Ok(pacientes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PacienteController.GetPacientes");
            return StatusCode(500, "Erro ao buscar pacientes.");
        }
    }
    
    [HttpPost("InserePaciente")]
    public IActionResult InserePaciente(Paciente paciente)
    {
        try
        {
            // Criptografa os dados sensíveis antes de salvar
            paciente.Telefone = _cryptoService.Encrypt(paciente.Telefone);
            paciente.Email = _cryptoService.Encrypt(paciente.Email);
            
            _context.Pacientes.Add(paciente);
            _context.SaveChanges();
            
            Atendimento atendimento = new Atendimento
            {
                PacienteId = paciente.ID,
                DataHoraChegada = DateTime.Now,
                NumeroSequencial = 0, // Será definido na função InsereAtendimento
                Status = "Aguardando"
            };
            
            this._atendimentoService.InsereAtendimento(atendimento);
            
            return Ok(paciente);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PacienteController.InserePaciente");
            return StatusCode(500, "Erro ao inserir paciente.");
        }
    }
}