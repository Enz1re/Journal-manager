using JournalManager.Data.Constants;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
using Microsoft.AspNetCore.Mvc;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
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

        [HttpPost]
        [Route("Request/Accept")]
        public IActionResult AcceptRequest(Request request)
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
        public IActionResult DeclineRequest(Request request)
        {
            var status = _requestRepository.RemoveRequest(request.Id, false);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }
        
        [HttpPost]
        [Route("{yearlabel}")]
        public IActionResult CreateYear(string yearLabel)
        {
            var status = _curriculumRepository.CreateYear(yearLabel);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("{facultyid}/{disciplinename}/{terms}")]
        public IActionResult CreateDiscipline(int facultyid, string facultyName, string disciplineName, Term[] terms)
        {
            var status = _curriculumRepository.CreateDiscipline(facultyid, facultyName, disciplineName, terms);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("{year}/{facultyname}")]
        public IActionResult CreateFaculty(string year, string facultyName)
        {
            var status = _curriculumRepository.CreateFaculty(year, facultyName);
            if (status.Message != Strings.OK)
            {
                return BadRequest(status.Message);
            }

            return Ok();
        }
    }
}