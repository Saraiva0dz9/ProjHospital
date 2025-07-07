using ApiHospital.Context;
using ApiHospital.Models;
using ApiHospital.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiHospital.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AtendimentoController : Controller
{
    private readonly AtendimentosContext _context;
    private readonly ILogger<AtendimentoController> _logger;
    
    public AtendimentoController(AtendimentosContext context, ILogger<AtendimentoController> logger)
    {
        this._context = context;
        this._logger = logger;
    }
    
    [HttpGet("GetAtendimentos")]
    public List<Atendimento> GetAtendimentos()
    {
        try
        {
            var atendimentos = _context.Atendimentos.OrderBy(x => x.NumeroSequencial).ToList();
        
            return atendimentos;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AtendimentoController.GetAtendimentos");
            throw;
        }
    }
    
    [HttpPut("FinalizaAtendimento/{id}")] 
    public IActionResult FinalizaAtendimento(int id)
    {
        try
        {
            var atendimento = _context.Atendimentos.FirstOrDefault(a => a.ID == id);
            if (atendimento == null)
            {
                return NotFound("Atendimento não encontrado.");
            }
            
            atendimento.Status = "Finalizado";
            _context.SaveChanges();

            return Ok(atendimento);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AtendimentoController.FinalizaAtendimento");
            return StatusCode(500, "Erro ao finalizar atendimento.");
        }
    } 
}