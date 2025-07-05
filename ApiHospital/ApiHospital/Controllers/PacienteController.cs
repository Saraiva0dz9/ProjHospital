using ApiHospital.Context;
using ApiHospital.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiHospital.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacienteController : Controller
{
    private readonly PacienteContext _context;
    private readonly AtendimentosContext _atendimentoContext;
    private readonly ILogger<PacienteController> _logger;
    
    public PacienteController(PacienteContext context, ILogger<PacienteController> logger, AtendimentosContext atendimentoContext)
    {
        this._context = context;
        this._atendimentoContext = atendimentoContext;
        this._logger = logger;
    }
    
    [HttpGet("GetPacientes")]
    private List<Paciente> GetPacientes()
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
    private IActionResult InserePaciente(Paciente paciente)
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
            
            InsereAtendimento(atendimento);
            
            return Ok(paciente);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PacienteController.InserePaciente");
            return StatusCode(500, "Erro ao inserir paciente.");
        }
    }
    
    private void InsereAtendimento(Atendimento atendimento)
    {
        try
        {
            // Pega a data atual (sem hora)
            DateTime hoje = DateTime.Today;

            // Verifica quantos atendimentos já existem hoje
            int atendimentosHoje = _atendimentoContext.Atendimentos
                .Count(a => a.DataHoraChegada.Date == hoje);

            // Define o próximo número sequencial (começando em 1)
            atendimento.NumeroSequencial = atendimentosHoje + 1;
            
            _atendimentoContext.Atendimentos.Add(atendimento);
            _atendimentoContext.SaveChanges();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AtendimentoController.InsereAtendimento");
            throw;
        }
    }
}