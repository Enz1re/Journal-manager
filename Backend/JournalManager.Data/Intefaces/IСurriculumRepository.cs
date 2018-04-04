using JournalManager.Data.Models.Business;
using JournalManager.Data.Models.Data;
using System.Collections.Generic;

namespace JournalManager.Data.Interfaces
{
    public interface IСurriculumRepository
    {
        Year GetYear(int id);

        Year GetCurrentYear();

        IEnumerable<Year> GetYears();

        CurriculumStatus CreateYear(string yearLabel);

        Discipline GetDiscipline(int id);

        IEnumerable<ListItem> GetDisciplineList(int facultyId);

        CurriculumStatus CreateDiscipline(int facultyid, string facultyName, string disciplineName, Term[] terms);

        Faculty GetFaculty(int id);

        IEnumerable<ListItem> GetFacultyList(int yearId);

        CurriculumStatus CreateFaculty(string year, string facultyName);
    }
}
