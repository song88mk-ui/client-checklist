using Client.Checklist.Shared.Data.ClientChecklist.Entities;
using Microsoft.EntityFrameworkCore;

namespace Client.Checklist.Shared.Data.ClientChecklist
{
    public sealed class ClientChecklistContext : DbContext
    {
        public ClientChecklistContext(DbContextOptions<ClientChecklistContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClientInformation>().HasKey(k => new { k.ClientId });
        }

        public DbSet<ClientInformation> ClientInformation { get; set; }

    }
}
