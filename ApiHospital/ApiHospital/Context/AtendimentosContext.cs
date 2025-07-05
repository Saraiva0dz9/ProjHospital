using ApiHospital.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHospital.Context;

public class AtendimentosContext(DbContextOptions<AtendimentosContext> options) : DbContext(options)
{
    public DbSet<Atendimento> Atendimento { get; set; } 
}