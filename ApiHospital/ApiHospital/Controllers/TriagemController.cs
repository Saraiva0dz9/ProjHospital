using ApiHospital.Context;
using ApiHospital.Models;
using ApiHospital.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiHospital.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TriagemController : Controller
{
    private readonly TriagemContext  _triagemContext;
    private readonly ILogger<TriagemController> _logger;
    private readonly AtendimentoService _atendimentoService;
    
    public TriagemController(TriagemContext triagemContext, ILogger<TriagemController> logger, AtendimentoService atendimentoService)
    {
        this._triagemContext = triagemContext;
        this._logger = logger;
        this._atendimentoService = atendimentoService;
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
            
            // Atualiza o status do atendimento para "Em Triagem"
            this._atendimentoService.AtualizaStatusAtendimento(triagem.AtendimentoId, "Em Triagem");

            return Ok(triagem);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TriagemController.InsereTriagem");
            return StatusCode(500, "Erro ao inserir triagem.");
        }
    }
    
    [HttpGet("GetTriagemByAtendimentoId/{id}")]
    public ActionResult<Triagem> GetTriagemByIdAtendimento(int id)
    {
        try
        {
            var triagem = _triagemContext.Triagem.FirstOrDefault(t => t.AtendimentoId == id);
            if (triagem == null)
            {
                return NotFound("Triagem não encontrada.");
            }
            return Ok(triagem);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "TriagemController.GetTriagemByIdAtendimento");
            return StatusCode(500, "Erro ao buscar triagem por ID de atendimento.");
        }
    }
}