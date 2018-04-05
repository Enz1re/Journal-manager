using JournalManager.Data.Constants;

namespace JournalManager.Data.Models.Business
{
    public sealed class CurriculumStatus : Status
    {
        public object CurriculumObject { get; set; }

        public static CurriculumStatus OK<TCurriculum>(TCurriculum obj) => new CurriculumStatus(Strings.OK, obj);

        public static CurriculumStatus YearExists(string yearLabel) => new CurriculumStatus(Strings.SuchYearExists(yearLabel), null);

        public static CurriculumStatus DisciplineExists(string discipline) => new CurriculumStatus(Strings.DisciplineExists(discipline), null);

        public static CurriculumStatus NoSuchYear(string yearLabel) => new CurriculumStatus(Strings.NoSuchYear(yearLabel), null);

        public static CurriculumStatus FacultyExists(string facultyName) => new CurriculumStatus(Strings.SuchFacultyExists(facultyName), null);

        public static CurriculumStatus NoSuchFaculty(string facultyName) => new CurriculumStatus(Strings.NoSuchFaculty(facultyName), null);

        private CurriculumStatus(string message, object curriculumObject)
        {
            Message = message;
            CurriculumObject = curriculumObject;
        }
    }
}
