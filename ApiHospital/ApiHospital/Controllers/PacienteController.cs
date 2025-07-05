using ApiHospital.Context;
using ApiHospital.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiHospital.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacienteController : Controller
{
    private readonly PacienteContext _context;
    private readonly ILogger<PacienteController> _logger;
    
    public PacienteController(PacienteContext context, ILogger<PacienteController> logger)
    {
        this._context = context;
        this._logger = logger;
    }
    
    [HttpGet("GetPacientes")]
    private List<Paciente> GetPacientes()
    {
        try
        {
            var pacientes =  _context.Paciente.ToList();
        
            return pacientes;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PacienteController.GetPacientes");
            throw;
        }
    }
    
    [HttpPost("InserePaciente")]
    private IActionResult InserePaciente(Paciente paciente)
    {
        try
        {
            _context.Paciente.Add(paciente);
            _context.SaveChanges();

            return Ok(paciente);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PacienteController.InserePaciente");
            return StatusCode(500, "Erro ao inserir paciente.");
        }
    }
}