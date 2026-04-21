using PharmaBackEnd.Models;

namespace PharmaBackEnd.Interfaces
{
    public interface ILogin
    {
        bool ValidateUser(Login model);
    }
}
