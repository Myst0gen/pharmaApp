using Microsoft.AspNetCore.Mvc;
using PharmaBackEnd.Auth;
using PharmaBackEnd.Interfaces;
using PharmaBackEnd.Models;

namespace PharmaBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(TokenService tokenService,ILogin bll) : ControllerBase
    {
        [HttpPost(Name = "Login")]
        public IActionResult Login([FromBody] Login request)
        {
            try
            {
                bool isValidUser = bll.ValidateUser(request);
                if (!isValidUser)
                    return Unauthorized(new { message = "Invalid username or password" });

                var token = tokenService.generateToken(request.Username, request.Password);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred during login", error = ex.Message });
            }
        }
    }
}
