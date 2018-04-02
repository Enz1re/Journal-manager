using Microsoft.AspNetCore.Mvc;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Constants;
using JournalManager.Data.Models.Data;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("api/Data")]
    public class DataController : Controller
    {
        private IСurriculumRepository _curriculumRepository;
        private IRequestRepository _requestRepository;

        public DataController(IСurriculumRepository curriculumRepository, IRequestRepository requestRepository)
        {
            _curriculumRepository = curriculumRepository;
            _requestRepository = requestRepository;
        }

        [HttpGet]
        [Route("Year")]
        public IActionResult GetYearData()
        {
            return Ok(new
            {
                years = _curriculumRepository.GetYears(),
                currentYear = _curriculumRepository.GetCurrentYear()
            });
        }

        [HttpGet]
        [Route("Faculties/{yearId}")]
        public IActionResult GetFaculties([FromRoute]int yearId)
        {
            if (_curriculumRepository.GetYear(yearId) == null)
            {
                return BadRequest(Strings.NoSuchYear(yearId.ToString()));
            }

            return Ok(new { faculties = _curriculumRepository.GetFacultyList(yearId)});
        }

        [HttpGet]
        [Route("Faculty/{id}")]
        public IActionResult GetFaculty([FromRoute]int id)
        {
            var faculty = _curriculumRepository.GetFaculty(id);
            if (faculty == null)
            {
                return BadRequest(Strings.NoSuchFaculty(id.ToString()));
            }

            return Ok(faculty);
        }

        [HttpGet]
        [Route("Disciplines/{facId}")]
        public IActionResult GetDisciplines([FromRoute]int facId)
        {
            if (_curriculumRepository.GetFaculty(facId) == null)
            {
                return BadRequest(Strings.NoSuchFaculty(facId.ToString()));
            }

            return Ok(new { disciplines = _curriculumRepository.GetDisciplineList(facId) });
        }

        [HttpGet]
        [Route("Discipline/{id}")]
        public IActionResult GetDiscipline([FromRoute]int id)
        {
            var discipline = _curriculumRepository.GetDiscipline(id);
            if (discipline == null)
            {
                return BadRequest(Strings.NoSuchDiscipline(id.ToString()));
            }

            return Ok(discipline);
        }

        [HttpPost]
        [Route("Request/Submit")]
        public IActionResult SubmitRequest(Request request)
        {
            var status = _requestRepository.AddRequest(request);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }
    }
}