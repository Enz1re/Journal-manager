using System.Collections.Generic;
using System.Linq;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Business;
using JournalManager.Data.Models.Data;

namespace JournalManager.Data.Repositories
{
    public class CurriculumRepository : IСurriculumRepository
    {
        private DataContext _db;

        public CurriculumRepository(DataContext db)
        {
            _db = db;
        }

        public string GetYear(int id)
        {
            return _db.Years.Find(id)?.Label;
        }

        public string GetCurrentYear()
        {
            return _db.Years.Last().Label;
        }

        public IEnumerable<string> GetYears()
        {
            return _db.Years.Select(y => y.Label);
        }

        public CurriculumStatus CreateYear(string yearLabel)
        {
            if (_db.Years.Any(y => y.Label == yearLabel))
            {
                return CurriculumStatus.YearExists(yearLabel);
            }

            _db.Years.Add(new Year { Label = yearLabel });
            _db.SaveChanges();

            return CurriculumStatus.OK;
        }

        public Discipline GetDiscipline(int id)
        {
            return _db.Disciplines.Find(id);
        }

        public IEnumerable<ListItem> GetDisciplineList(int facultyId)
        {
            return _db.Faculties.Find(facultyId).Disciplines.Select(d => new ListItem { Id = d.Id, Name = d.Name });
        }

        public CurriculumStatus CreateDiscipline(int facultyid, string facultyName, string disciplineName, Term[] terms)
        {
            if (!_db.Faculties.Any(f => f.Id == facultyid))
            {
                return CurriculumStatus.NoSuchFaculty(facultyName);
            }
            if (_db.Faculties.Single(f => f.Id == facultyid).Disciplines.All(d => d.Name != disciplineName))
            {
                return CurriculumStatus.FacultyExists(facultyName);
            }

            _db.Faculties.Single(f => f.Id == facultyid).Disciplines.Add(new Discipline
            {
                Name = disciplineName,
                Terms = terms.ToList()
            });
            _db.SaveChanges();

            return CurriculumStatus.OK;
        }

        public Faculty GetFaculty(int id)
        {
            return _db.Faculties.Find(id);
        }

        public IEnumerable<ListItem> GetFacultyList(int yearId)
        {
            return _db.Years.Find(yearId).Faculties.Select(f => new ListItem { Id = f.Id, Name = f.Name });
        }

        public CurriculumStatus CreateFaculty(string year, string facultyName)
        {
            if (!_db.Years.Any(y => y.Label == year))
            {
                return CurriculumStatus.NoSuchYear(year);
            }
            if (_db.Years.Single(y => y.Label == year).Faculties.All(f => f.Name != facultyName))
            {
                return CurriculumStatus.FacultyExists(facultyName);
            }

            _db.Years.Single(y => y.Label == year).Faculties.Add(new Faculty { Name = facultyName });
            _db.SaveChanges();

            return CurriculumStatus.OK;
        }
    }
}
