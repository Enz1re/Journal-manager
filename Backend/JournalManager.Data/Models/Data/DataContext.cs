using System;
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
            var admin = new User
            {
                Username = "admin",
                Password = "admin",
                FirstName = "admin",
                SecondName = "admin",
                Patronymic = "admin",
                Role = Role.Admin
            };
            var user = new User
            {
                Username = "user",
                Password = "user",
                FirstName = "user",
                SecondName = "user",
                Patronymic = "user",
                Role = Role.User
            };
            var tutor = new User
            {
                Username = "tutor",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            var tutor2 = new User
            {
                Username = "tutor2",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            var tutor3 = new User
            {
                Username = "tutor3",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            var tutor4 = new User
            {
                Username = "tutor4",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            var tutor5 = new User
            {
                Username = "tutor5",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            var tutor6 = new User
            {
                Username = "tutor6",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            var tutor7 = new User
            {
                Username = "tutor7",
                Password = "tutor",
                FirstName = "tutor",
                SecondName = "tutor",
                Patronymic = "tutor",
                Role = Role.Tutor
            };
            if (!Users.Any())
            {
                Users.Add(admin);
                Users.Add(tutor);
                Users.Add(tutor2);
                Users.Add(tutor3);
                Users.Add(tutor4);
                Users.Add(tutor5);
                Users.Add(tutor6);
                Users.Add(tutor7);
                Users.Add(user);
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
                                    Number = 1,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    Number = 2,
                                    Type = "Семестр",
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
                                    Number = 1,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                            }
                        },
                        new Discipline
                        {
                            Name = "Искусственный интеллект",
                            Terms =
                            {
                                new Term
                                {
                                    Number = 1,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    Number = 2,
                                    Type = "Семестр",
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
                                    Number = 1,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    Number = 2,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/edit"
                                }
                            }
                        }
                    }
                };
                year.Faculties.Add(f2);
                var f3 = new Faculty
                {
                    Name = "Факультет юридических наук",
                    Disciplines =
                    {
                        new Discipline
                        {
                            Name = "Гражданское право",
                            Terms =
                            {
                                new Term
                                {
                                    Number = 1,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/"
                                },
                                new Term
                                {
                                    Number = 2,
                                    Type = "Семестр",
                                    SpreadsheetUrl = "https://docs.google.com/spreadsheets/d/1clZDT94GIx7LVm4HSMzBtmsqsP3RlzNFKqc5ctQBSO8/edit"
                                }
                            }
                        }
                    }
                };
                year.Faculties.Add(f3);
                Years.Add(year);
            }
            SaveChanges();
            if (!PendingRequests.Any())
            {
                PendingRequests.Add(new Request { Date = DateTime.UtcNow, IssuerId = user.Id, Title = "Make me a tutor" });
                PendingRequests.Add(new Request { Date = DateTime.UtcNow.AddHours(1), IssuerId = tutor.Id, Title = "Make me a user" });
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
