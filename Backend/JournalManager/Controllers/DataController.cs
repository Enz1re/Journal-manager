using Microsoft.AspNetCore.Mvc;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Constants;
using JournalManager.Data.Models.Data;
using Microsoft.AspNetCore.Authorization;

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
        [AllowAnonymous]
        public IActionResult GetYearData()
        {
            return Ok(new
            {
                years = _curriculumRepository.GetYears(),
                currentYear = _curriculumRepository.GetCurrentYear()
            });
        }

        [HttpGet]
        [Route("Faculties/{year}")]
        [AllowAnonymous]
        public IActionResult GetFaculties([FromRoute]string year)
        {
            if (_curriculumRepository.GetYear(year) == null)
            {
                return BadRequest(Strings.NoSuchYear(year));
            }

            return Ok(new { faculties = _curriculumRepository.GetFacultyList(year) });
        }

        [HttpGet]
        [Route("Faculty/{id}")]
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [Authorize(Roles = "User")]
        public IActionResult SubmitRequest([FromBody]Request request)
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