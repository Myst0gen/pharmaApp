using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PharmaBackEnd.Auth;
using PharmaBackEnd.Interfaces;
using PharmaBackEnd.Models;

namespace PharmaBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController(IMedicineBll bll) : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var data = bll.GetAllMedicines();
                return Ok(new { data });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Medicines request)
        {
            try
            {
                var status = bll.AddMedicine(request);
                if (status!=1)
                    return BadRequest(new { message = "Something went wrong" });

                return Ok(new { message = "Medicine Added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }
    }
}
