using GymTrackerMobile.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace GymTrackerMobile.API.Data
{
    public class GymTrackerDbContext : DbContext
    {
        public GymTrackerDbContext(DbContextOptions<GymTrackerDbContext> options) : base(options)
        {
        }
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<User> Users => Set<User>();
        public DbSet<ExerciseCategory> ExerciseCategories => Set<ExerciseCategory>();
        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<MembershipType> MembershipTypes => Set<MembershipType>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>()
                .Property(r => r.Name)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .HasMaxLength(150)
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<ExerciseCategory>()
                .Property(c => c.Name)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder.Entity<Exercise>()
                .Property(e => e.Name)
                .HasMaxLength(150)
                .IsRequired();

            modelBuilder.Entity<Exercise>()
                .Property(e => e.DifficultyLevel)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<MembershipType>()
                .Property(m => m.Name)
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}
