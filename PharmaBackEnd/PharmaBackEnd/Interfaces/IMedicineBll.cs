using PharmaBackEnd.DTO;
using PharmaBackEnd.Models;

namespace PharmaBackEnd.Interfaces
{
    public interface IMedicineBll
    {
        List<MedicineDTO> GetAllMedicines();
        int AddMedicine(Medicines medicine);
    }
}
