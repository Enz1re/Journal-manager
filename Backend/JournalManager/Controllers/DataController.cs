using System.Linq;
using JournalManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JournalManager.Controllers
{
    [Produces("application/json")]
    [Route("[controller]/[action]")]
    public class DataController : Controller
    {
        private DataContext _db;

        public DataController(DataContext context)
        {
            _db = context;
        }

        [HttpGet]
        public IActionResult GetYearData()
        {
            return Ok(new
            {
                years=_db.Years.Select(y=>y.Label),
                currentYear=_db.Years.Last().Label
            });
        }

        [HttpGet]
        [Route("{yearid}")]
        public IActionResult GetFaculties(int yearid)
        {
            if (!_db.Years.Any(y => y.Id == yearid))
            {
                return BadRequest("No such year");
            }
            return Ok(_db.Years.Include(y=>y.Faculties).ThenInclude(f=>f.Disciplines)
                .Single(y => y.Id == yearid).Faculties.Select(f=> new
            {
                facName=f.Name,
                discipines=f.Disciplines
            }));
        }

        [HttpGet]
        [Route("{disciplineid}")]
        public IActionResult GetDiscipline(int disciplineid)
        {
            if (!_db.Disciplines.Any(d => d.Id == disciplineid))
            {
                return BadRequest("No such discipline");
            }
            return Ok(_db.Disciplines.Include(d=>d.Terms).Single(d => d.Id == disciplineid));
        }

        [HttpGet]
        [Route("{request}")]
        public IActionResult SubmitRequest(Request request)
        {
            request.User=_db.Users.Single(u=>u.GetToken()==Request.Headers["access_token"]);
            _db.Requests.Update(request);
            _db.SaveChanges();
            return Ok();
        }
    }
}