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
            modelBuilder.Entity<ClientSteps>().HasKey(k => new { k.ClientStepId });
            modelBuilder.Entity<ClientSubtask>().HasKey(k => new { k.ClientStepId, k.SubtaskId });
        }

        public DbSet<ClientInformation> ClientInformation { get; set; }
        public DbSet<ClientSteps> ClientSteps { get; set; }
        public DbSet<ClientSubtask> ClientSubtask { get; set; }

    }
}
