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
    
    public PacienteController(PacienteContext context, ILogger<PacienteController> logger, AtendimentoService atendimentoService)
    {
        this._context = context;
        this._atendimentoService = atendimentoService;
        this._logger = logger;
    }
    
    [HttpGet("GetPacientes")]
    public List<Paciente> GetPacientes()
    {
        try
        {
            var pacientes =  _context.Pacientes.ToList();
        
            return pacientes;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PacienteController.GetPacientes");
            throw;
        }
    }
    
    [HttpPost("InserePaciente")]
    public IActionResult InserePaciente(Paciente paciente)
    {
        try
        {
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