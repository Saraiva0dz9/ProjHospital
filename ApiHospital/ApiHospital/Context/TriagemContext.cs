using ApiHospital.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHospital.Context;

public class TriagemContext(DbContextOptions<TriagemContext> options) : DbContext(options)
{
    public DbSet<Triagem> Triagem { get; set; }
}