using Microsoft.IdentityModel.Tokens;
using PharmaBackEnd.Auth;
using PharmaBackEnd.Interfaces;
using PharmaBackEnd.Models;
using System.Text;

namespace PharmaBackEnd.Repositories
{
    public class LoginBll(IConfiguration config):ILogin
    {
        public bool ValidateUser(Login model)
        {
            return model.Username == config["credentials:username"] && model.Password == config["credentials:password"];
        }
    }
}
