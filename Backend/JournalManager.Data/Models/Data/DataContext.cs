using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace JournalManager.Data.Models.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Year> Years { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<Discipline> Disciplines { get; set; }

        public DbSet<Request> PendingRequests { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
            #region InitDb

            if (!Users.Any())
            {
                Users.Add(new User
                {
                    Username = "admin",
                    Password = "admin",
                    Role = Role.Admin
                });
                Users.Add(new User
                {
                    Username = "user",
                    Password = "user"
                });
                Users.Add(new User
                {
                    Username = "tutor",
                    Password = "tutor",
                    Role = Role.Tutor
                });
            }
            if (!Years.Any())
            {
                var year = new Year
                {
                    Label = "2017-2018"
                };
                var f1 = new Faculty
                {
                    Name = "Факультет комьютерных наук",
                    Disciplines =
                    {
                        new Discipline
                        {
                            Name = "Модели и методы исследования операций",
                            Terms = {
                                new Term
                                {
                                    TermNumber = 1,
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    TermNumber = 2,
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/",
                                }
                            }
                        },
                        new Discipline
                        {
                            Name = "Геоинформационные системы",
                            Terms =
                            {
                                new Term
                                {
                                    TermNumber = 1,
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },

                            }
                        }
                    }
                };
                year.Faculties.Add(f1);
                var f2 = new Faculty
                {
                    Name = "Факультет политических наук",
                    Disciplines =
                    {
                        new Discipline
                        {
                            Name = "Криминальное право",
                            Terms =
                            {
                                new Term
                                {
                                    TermNumber = 1,
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    TermNumber = 2,
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    TermNumber = 3,
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                }
                            }
                        }
                    }
                };
                year.Faculties.Add(f2);
                Years.Add(year);
            }

            SaveChanges();

            #endregion
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().Property(u => u.Role).HasDefaultValue(Role.User);
            builder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        }
    }
}
