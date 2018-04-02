using System.Linq;
using JournalManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("[controller]/[action]")]
    public class AdminController : Controller
    {
        private DataContext _db;

        public AdminController(DataContext context)
        {
            _db = context;
        }

        [HttpGet]
        public IActionResult GetPendingRequests()
        {
            return Ok(_db.Requests.Where(r=>r.Status==Status.Pending));
        }

        [HttpGet]
        public IActionResult GetTutors()
        {
            return Ok(_db.Users.Where(u=>u.Role==Role.Tutor));
        }

        [HttpGet]
        [Route("{request}")]
        public IActionResult AcceptRequest(Request request)
        {
            if (!_db.Requests.Any(r => r.Id == request.Id))
            {
                return BadRequest("No such request");
            }
            request.Status=Status.Accepted;
            _db.Requests.Update(request);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("{request}")]
        public IActionResult DeclineRequest(Request request)
        {
            if (!_db.Requests.Any(r => r.Id == request.Id))
            {
               return BadRequest("No such request");
            }
            request.Status = Status.Declined;
            _db.Requests.Update(request);
            _db.SaveChanges();
            return Ok();
        }

        
        [HttpGet]
        [Route("{yearlabel}")]
        public IActionResult CreateYear(string yearlabel)
        {
            if (_db.Years.Any(y => y.Label == yearlabel))
            {
                return BadRequest("Such year already exist");
            }
            _db.Years.Add(new Year { Label = yearlabel });
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("{yearid}/{facultyname}")]
        public IActionResult CreateFaculty(int yearid, string facultyname)
        {
            if (!_db.Years.Any(y => y.Id == yearid))
            {
                return BadRequest("No such year");
            }
            if (_db.Years.Single(y => y.Id == yearid).Faculties.All(f => f.Name != facultyname))
            {
                return BadRequest("Such faculty already exist");
            }
            _db.Years.Single(y => y.Id == yearid).Faculties.Add(new Faculty{Name =facultyname});
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("{facultyid}/{disciplinename}/{terms}")]
        public IActionResult CreateDiscipline(int facultyid, string disciplinename,Term [] terms)
        {
            if (!_db.Faculties.Any(f => f.Id == facultyid))
            {
                return BadRequest("No such faculty");
            }
            if (_db.Faculties.Single(f => f.Id == facultyid).Disciplines.All(d => d.Name != disciplinename))
            {
                return BadRequest("Such faculty already exist");
            }
            _db.Faculties.Single(f => f.Id == facultyid).Disciplines.Add(new Discipline
            {
                Name = disciplinename,
                Terms = terms.ToList()
            });
            _db.SaveChanges();
            return Ok();
        }

        
    }
}