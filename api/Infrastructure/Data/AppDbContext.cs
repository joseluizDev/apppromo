using BackAppPromo.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackAppPromo.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Reserva> Reserva { get; set; }
        public DbSet<Imagem> Imagem { get; set; }
        public DbSet<Banner> Banner { get; set; }
    }
}
