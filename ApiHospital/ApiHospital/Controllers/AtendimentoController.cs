using ApiHospital.Context;
using ApiHospital.Models;
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
    private List<Atendimento> GetAtendimentos()
    {
        try
        {
            var atendimentos = _context.Atendimentos.ToList();
        
            return atendimentos;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AtendimentoController.GetAtendimentos");
            throw;
        }
    }
}