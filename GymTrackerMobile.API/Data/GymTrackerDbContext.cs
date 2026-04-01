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
        public DbSet<WorkoutPlan> WorkoutPlans => Set<WorkoutPlan>();
        public DbSet<WorkoutPlanExercise> WorkoutPlanExercises => Set<WorkoutPlanExercise>();
        public DbSet<WorkoutSession> WorkoutSessions => Set<WorkoutSession>();
        public DbSet<ProgressEntry> ProgressEntries => Set<ProgressEntry>();
        public DbSet<MembershipType> MembershipTypes => Set<MembershipType>();
        public DbSet<UserMembership> UserMemberships => Set<UserMembership>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(x => x.Name)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(x => x.Description)
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(x => x.Name)
                    .HasMaxLength(150)
                    .IsRequired();

                entity.Property(x => x.Email)
                    .HasMaxLength(200)
                    .IsRequired();

                entity.Property(x => x.PasswordHash)
                    .IsRequired();

                entity.HasIndex(x => x.Email)
                    .IsUnique();

                entity.HasOne(x => x.Role)
                    .WithMany(x => x.Users)
                    .HasForeignKey(x => x.RoleId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ExerciseCategory>(entity =>
            {
                entity.Property(x => x.Name)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(x => x.Description)
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Exercise>(entity =>
            {
                entity.Property(x => x.Name)
                    .HasMaxLength(150)
                    .IsRequired();

                entity.Property(x => x.Description)
                    .HasMaxLength(500);

                entity.Property(x => x.DifficultyLevel)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.HasOne(x => x.Category)
                    .WithMany(x => x.Exercises)
                    .HasForeignKey(x => x.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<WorkoutPlan>(entity =>
            {
                entity.Property(x => x.Name)
                    .HasMaxLength(150)
                    .IsRequired();

                entity.Property(x => x.Goal)
                    .HasMaxLength(250);

                entity.HasOne(x => x.User)
                    .WithMany(x => x.WorkoutPlans)
                    .HasForeignKey(x => x.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<WorkoutPlanExercise>(entity =>
            {
                entity.HasOne(x => x.WorkoutPlan)
                    .WithMany(x => x.WorkoutPlanExercises)
                    .HasForeignKey(x => x.WorkoutPlanId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.Exercise)
                    .WithMany(x => x.WorkoutPlanExercises)
                    .HasForeignKey(x => x.ExerciseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<WorkoutSession>(entity =>
            {
                entity.Property(x => x.Notes)
                    .HasMaxLength(500);

                entity.HasOne(x => x.User)
                    .WithMany(x => x.WorkoutSessions)
                    .HasForeignKey(x => x.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.WorkoutPlan)
                    .WithMany(x => x.WorkoutSessions)
                    .HasForeignKey(x => x.WorkoutPlanId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ProgressEntry>(entity =>
            {
                entity.Property(x => x.Weight)
                    .HasPrecision(10, 2);

                entity.Property(x => x.Comment)
                    .HasMaxLength(500);

                entity.HasOne(x => x.User)
                    .WithMany(x => x.ProgressEntries)
                    .HasForeignKey(x => x.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.Exercise)
                    .WithMany(x => x.ProgressEntries)
                    .HasForeignKey(x => x.ExerciseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<MembershipType>(entity =>
            {
                entity.Property(x => x.Name)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(x => x.Description)
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<UserMembership>(entity =>
            {
                entity.Property(x => x.Status)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.HasOne(x => x.User)
                    .WithMany(x => x.UserMemberships)
                    .HasForeignKey(x => x.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(x => x.MembershipType)
                    .WithMany(x => x.UserMemberships)
                    .HasForeignKey(x => x.MembershipTypeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            SeedData(modelBuilder);
        }
        private void SeedData(ModelBuilder modelBuilder)
        {
            // ROLES
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin", Description = "Administrator" },
                new Role { Id = 2, Name = "User", Description = "Regular user" }
            );

            // USERS
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Admin User",
                    Email = "admin@gym.com",
                    PasswordHash = "admin-hash",
                    RoleId = 1
                },
                new User
                {
                    Id = 2,
                    Name = "Test User",
                    Email = "user@gym.com",
                    PasswordHash = "user-hash",
                    RoleId = 2
                }
            );

            // EXERCISE CATEGORIES
            modelBuilder.Entity<ExerciseCategory>().HasData(
                new ExerciseCategory { Id = 1, Name = "Chest", Description = "Chest exercises" },
                new ExerciseCategory { Id = 2, Name = "Back", Description = "Back exercises" },
                new ExerciseCategory { Id = 3, Name = "Legs", Description = "Leg exercises" }
            );

            // EXERCISES
            modelBuilder.Entity<Exercise>().HasData(
                new Exercise
                {
                    Id = 1,
                    Name = "Bench Press",
                    Description = "Chest barbell press",
                    DifficultyLevel = "Medium",
                    CategoryId = 1
                },
                new Exercise
                {
                    Id = 2,
                    Name = "Pull Up",
                    Description = "Bodyweight back exercise",
                    DifficultyLevel = "Hard",
                    CategoryId = 2
                },
                new Exercise
                {
                    Id = 3,
                    Name = "Squat",
                    Description = "Leg compound exercise",
                    DifficultyLevel = "Hard",
                    CategoryId = 3
                }
            );

            // MEMBERSHIP TYPES
            modelBuilder.Entity<MembershipType>().HasData(
                new MembershipType { Id = 1, Name = "Basic", Description = "Basic membership" },
                new MembershipType { Id = 2, Name = "Premium", Description = "Premium membership" }
            );

            // WORKOUT PLANS
            modelBuilder.Entity<WorkoutPlan>().HasData(
                new WorkoutPlan
                {
                    Id = 1,
                    Name = "Beginner Plan",
                    Goal = "Build strength",
                    UserId = 2,
                    CreatedAt = new DateTime(2024, 1, 1)
                }
            );

            // WORKOUT PLAN EXERCISES
            modelBuilder.Entity<WorkoutPlanExercise>().HasData(
                new WorkoutPlanExercise
                {
                    Id = 1,
                    WorkoutPlanId = 1,
                    ExerciseId = 1,
                    Sets = 3,
                    Reps = 10,
                    OrderIndex = 1
                },
                new WorkoutPlanExercise
                {
                    Id = 2,
                    WorkoutPlanId = 1,
                    ExerciseId = 3,
                    Sets = 4,
                    Reps = 8,
                    OrderIndex = 2
                }
            );

            // WORKOUT SESSIONS
            modelBuilder.Entity<WorkoutSession>().HasData(
                new WorkoutSession
                {
                    Id = 1,
                    UserId = 2,
                    WorkoutPlanId = 1,
                    SessionDate = new DateTime(2024, 1, 10),
                    DurationMinutes = 60,
                    Notes = "Good training"
                }
            );

            // PROGRESS
            modelBuilder.Entity<ProgressEntry>().HasData(
                new ProgressEntry
                {
                    Id = 1,
                    UserId = 2,
                    ExerciseId = 1,
                    Weight = 80,
                    Reps = 10,
                    CreatedAt = new DateTime(2024, 1, 10),
                    Comment = "Felt strong"
                }
            );

            // USER MEMBERSHIPS
            modelBuilder.Entity<UserMembership>().HasData(
                new UserMembership
                {
                    Id = 1,
                    UserId = 2,
                    MembershipTypeId = 2,
                    StartDate = new DateTime(2024, 1, 1),
                    EndDate = new DateTime(2024, 12, 31),
                    Status = "Active"
                }
            );
        }
    }
}
