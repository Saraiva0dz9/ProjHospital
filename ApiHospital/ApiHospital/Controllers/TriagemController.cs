using ApiHospital.Context;
using ApiHospital.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiHospital.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TriagemController : Controller
{
    private readonly TriagemContext  _triagemContext;
    private readonly ILogger<TriagemController> _logger;
    
    public TriagemController(TriagemContext triagemContext, ILogger<TriagemController> logger)
    {
        this._triagemContext = triagemContext;
        this._logger = logger;
    }
    
    [HttpGet("GetTriagems")]
    public List<Triagem> GetTriagems()
    {
        try
        {
            var triagems = _triagemContext.Triagem.ToList();
        
            return triagems;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TriagemController.GetTriagems");
            throw;
        }
    }
    
    [HttpPost("InsereTriagem")]
    public IActionResult InsereTriagem(Triagem triagem)
    {
        try
        {
            _triagemContext.Triagem.Add(triagem);
            _triagemContext.SaveChanges();

            return Ok(triagem);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TriagemController.InsereTriagem");
            return StatusCode(500, "Erro ao inserir triagem.");
        }
    }
}