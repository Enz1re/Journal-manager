using JournalManager.Data.Models.Business;
using JournalManager.Data.Models.Data;
using System.Collections.Generic;

namespace JournalManager.Data.Interfaces
{
    public interface IСurriculumRepository
    {
        Year GetYear(string label);

        Year GetCurrentYear();

        IEnumerable<Year> GetYears();

        CurriculumStatus CreateYear(string yearLabel);

        Discipline GetDiscipline(int id);

        IEnumerable<ListItem> GetDisciplineList(int facultyId);

        CurriculumStatus CreateDiscipline(string facultyName, string disciplineName);

        CurriculumStatus AddTerm(int disciplineId, Term term, IEnumerable<User> tutors);

        Faculty GetFaculty(int id);

        IEnumerable<ListItem> GetFacultyList(string year);

        CurriculumStatus CreateFaculty(string year, string facultyName);
    }
}
