using System.Collections.Generic;
using System.Linq;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Business;
using JournalManager.Data.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace JournalManager.Data.Repositories
{
    public class CurriculumRepository : IСurriculumRepository
    {
        private DataContext _db;

        public CurriculumRepository(DataContext db)
        {
            _db = db;
        }

        public Year GetYear(string label)
        {
            return _db.Years.FirstOrDefault(y => y.Label == label);
        }

        public Year GetCurrentYear()
        {
            return _db.Years.Last();
        }

        public IEnumerable<Year> GetYears()
        {
            return _db.Years.ToArray();
        }

        public CurriculumStatus CreateYear(string yearLabel)
        {
            if (_db.Years.Any(y => y.Label == yearLabel))
            {
                return CurriculumStatus.YearExists(yearLabel);
            }

            var year = new Year { Label = yearLabel };

            _db.Years.Add(year);
            _db.SaveChanges();

            return CurriculumStatus.OK(year);
        }

        public Discipline GetDiscipline(int id)
        {
            return _db.Disciplines.Include(d => d.Terms).FirstOrDefault(d => d.Id == id);
        }

        public IEnumerable<ListItem> GetDisciplineList(int facultyId)
        {
            return _db.Faculties.Include(f => f.Disciplines)
                                .FirstOrDefault(f => f.Id == facultyId)
                                .Disciplines
                                .Select(d => new ListItem { Id = d.Id, Name = d.Name });
        }

        public CurriculumStatus CreateDiscipline(string facultyName, string disciplineName)
        {
            if (!_db.Faculties.Any(f => f.Name == facultyName))
            {
                return CurriculumStatus.NoSuchFaculty(facultyName);
            }
            if (!_db.Faculties.Single(f => f.Name == facultyName).Disciplines.All(d => d.Name != disciplineName))
            {
                return CurriculumStatus.DisciplineExists(facultyName);
            }

            var discipline = new Discipline { Name = disciplineName };

            _db.Faculties.Single(f => f.Name == facultyName).Disciplines.Add(discipline);
            _db.SaveChanges();

            return CurriculumStatus.OK(discipline);
        }

        public CurriculumStatus AddTerm(int disciplineId, Term term, IEnumerable<User> tutors)
        {
            var discipline = _db.Disciplines.Find(disciplineId);
            term.Tutors = tutors.ToList();
            discipline.Terms.Add(term);
            _db.SaveChanges();
            return CurriculumStatus.OK(term);
        }

        public Faculty GetFaculty(int id)
        {
            return _db.Faculties.Find(id);
        }

        public IEnumerable<ListItem> GetFacultyList(string year)
        {
            return _db.Years.Include(y => y.Faculties)
                            .FirstOrDefault(y => y.Label == year)
                            .Faculties
                            .Select(f => new ListItem { Id = f.Id, Name = f.Name });
        }

        public CurriculumStatus CreateFaculty(string year, string facultyName)
        {
            if (!_db.Years.Any(y => y.Label == year))
            {
                return CurriculumStatus.NoSuchYear(year);
            }
            if (_db.Years.Single(y => y.Label == year).Faculties.Any(f => f.Name == facultyName))
            {
                return CurriculumStatus.FacultyExists(facultyName);
            }

            var faculty = new Faculty { Name = facultyName };

            _db.Years.Single(y => y.Label == year).Faculties.Add(faculty);
            _db.SaveChanges();

            return CurriculumStatus.OK(faculty);
        }
    }
}
