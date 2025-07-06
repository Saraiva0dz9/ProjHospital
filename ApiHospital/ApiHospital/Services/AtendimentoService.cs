using ApiHospital.Context;
using ApiHospital.Models;

namespace ApiHospital.Services;

public class AtendimentoService
{
    private readonly AtendimentosContext _atendimentoContext;
    private readonly ILogger<AtendimentoService> _logger;

    public AtendimentoService(AtendimentosContext atendimentoContext, ILogger<AtendimentoService> logger)
    {
        _atendimentoContext = atendimentoContext;
        this._logger = logger;
    }
    
    public void InsereAtendimento(Atendimento atendimento)
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