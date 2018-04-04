using JournalManager.Data.Constants;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
using JournalManager.Data.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private IRequestRepository _requestRepository;
        private IUserRepository _userRepository;
        private IСurriculumRepository _curriculumRepository;

        public AdminController(IRequestRepository requestRepository, IUserRepository userRepository, IСurriculumRepository curriculumRepository)
        {
            _requestRepository = requestRepository;
            _userRepository = userRepository;
            _curriculumRepository = curriculumRepository;
        }

        [HttpGet]
        [Route("Request/Pending")]
        public IActionResult GetPendingRequests()
        {
            return Ok(_requestRepository.GetPendingRequests());
        }

        [HttpGet]
        [Route("Tutors")]
        public IActionResult GetTutors()
        {
            return Ok(_userRepository.GetTutors());
        }

        [HttpPost]
        [Route("Request/Accept")]
        public IActionResult AcceptRequest([FromBody]Request request)
        {
            var status = _requestRepository.RemoveRequest(request.Id);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            var issuer = request.Issuer;
            if (!_userRepository.MakeTutor(issuer))
            {
                return BadRequest(Strings.FailedToAccept);
            }

            return Ok();
        }

        [HttpPost]
        [Route("Request/Decline")]
        public IActionResult DeclineRequest([FromBody]Request request)
        {
            var status = _requestRepository.RemoveRequest(request.Id, false);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("Create/Year/{yearLabel}")]
        public IActionResult CreateYear([FromRoute]string yearLabel)
        {
            var status = _curriculumRepository.CreateYear(yearLabel);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("Create/Discipline")]
        public IActionResult CreateDiscipline([FromBody]DisciplineRequestModel discipline)
        {
            var status = _curriculumRepository.CreateDiscipline(discipline.FacultyId, discipline.FacultyName, discipline.DisciplineName, discipline.Terms);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("Create/Faculty")]
        public IActionResult CreateFaculty([FromBody]FacultyRequestModel faculty)
        {
            var status = _curriculumRepository.CreateFaculty(faculty.Year, faculty.FacultyName);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }
    }
}