﻿using JournalManager.Data.Constants;
using JournalManager.Data.Interfaces;
using JournalManager.Data.Models.Data;
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
        [Route("Create/Faculty")]
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