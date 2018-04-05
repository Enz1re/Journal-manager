using JournalManager.Data.Models.Data;

namespace JournalManager.Data.Constants
{
    public static class Strings
    {
        public static string OK => "OK";

        public static string NoSuchRequest(Request request) => $"No such request: \"{request.Title}\" with id {request.Id}";

        public static string SuchYearExists(string yearLabel) => $"Such year already exists: {yearLabel}";

        public static string NoSuchYear(string yearLabel) => $"No such year: {yearLabel}";

        public static string SuchFacultyExists(string facultyName) => $"Such faculty already exists: {facultyName}";

        public static string NoSuchFaculty(string facultyName) => $"No such faculty: {facultyName}";

        public static string NoSuchDiscipline(string disciplineName) => $"No such discipline: {disciplineName}";

        public static string DisciplineExists(string disciplineName) => $"Discipline \"{disciplineName}\" already exists";

        public static string UserExists(string username) => $"User {username} already exists";

        public static string NoSuchUser(int id) => $"No such user: {id}";

        public static string InvalidUsernameOrPassword => "Username or password is invalid";

        public static string RequestAlreadyExists => "Request has already been submitted";

        public static string RequestIsAlreadyAccepted => "Request is already accepted";

        public static string RequestIsAlreadyDeclined => "Request is already declined";

        public static string FailedToAccept => "Failed to accept a request";
    }
}
