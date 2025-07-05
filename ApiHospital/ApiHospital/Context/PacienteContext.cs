using ApiHospital.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiHospital.Context;

public class PacienteContext(DbContextOptions<PacienteContext> options) : DbContext(options)
{
    public DbSet<Paciente> Paciente { get; set; }
}