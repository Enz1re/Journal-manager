using JournalManager.Data.Constants;

namespace JournalManager.Data.Models.Business
{
    public sealed class CurriculumStatus : Status
    {
        public static CurriculumStatus OK => new CurriculumStatus(Strings.OK);

        public static CurriculumStatus YearExists(string yearLabel) => new CurriculumStatus(Strings.SuchYearExists(yearLabel));

        public static CurriculumStatus NoSuchYear(string yearLabel) => new CurriculumStatus(Strings.NoSuchYear(yearLabel));

        public static CurriculumStatus FacultyExists(string facultyName) => new CurriculumStatus(Strings.SuchFacultyExists(facultyName));

        public static CurriculumStatus NoSuchFaculty(string facultyName) => new CurriculumStatus(Strings.NoSuchFaculty(facultyName));

        private CurriculumStatus(string message)
        {
            Message = message;
        }
    }
}
