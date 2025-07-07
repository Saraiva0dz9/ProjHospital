using ApiHospital.Context;
using ApiHospital.Models;
using Microsoft.EntityFrameworkCore;

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
        // Cria uma transação com nível de isolamento serializable
        using var transaction = _atendimentoContext.Database.BeginTransaction(System.Data.IsolationLevel.Serializable);
    
        try
        {
            DateTime hoje = DateTime.Today;

            // Consulta dentro da transação para garantir consistência
            int ultimoNumero = _atendimentoContext.Atendimentos
                .Where(a => a.DataHoraChegada.Date == hoje)
                .Max(a => (int?)a.NumeroSequencial) ?? 0;

            atendimento.NumeroSequencial = ultimoNumero + 1;
            atendimento.DataHoraChegada = DateTime.Now; // Garante a hora exata

            _atendimentoContext.Atendimentos.Add(atendimento);
            _atendimentoContext.SaveChanges();
            transaction.Commit();
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            _logger.LogError(ex, "Falha ao inserir atendimento");
            throw new ApplicationException("Erro ao cadastrar atendimento. Tente novamente.", ex);
        }
    }
    
    public void AtualizaStatusAtendimento(int id, string status)
    {
        try
        {
            var atendimento = _atendimentoContext.Atendimentos.FirstOrDefault(a => a.ID == id);
            if (atendimento == null)
            {
                throw new Exception("Atendimento não encontrado.");
            }
            
            atendimento.Status = status;
            _atendimentoContext.SaveChanges();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "AtendimentoController.AtualizaStatusAtendimento");
            throw;
        }
    }
}