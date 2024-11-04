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
            modelBuilder.Entity<ClientTask>().HasKey(k => new { k.ClientTaskId });
            modelBuilder.Entity<ClientSubtask>().HasKey(k => new { k.ClientTaskId, k.SubtaskId });
        }

        public DbSet<ClientInformation> ClientInformation { get; set; }
        public DbSet<ClientTask> ClientTask { get; set; }
        public DbSet<ClientSubtask> ClientSubtask { get; set; }

    }
}
